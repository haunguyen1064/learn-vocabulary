import { useState, useCallback, useEffect } from 'react';
import type { VocabularyWord } from '../types/vocabulary';
import { getAllWords } from '../services/vocabularyService';
import { useAuth } from '../context/AuthContext';
import { prioritizeWordsForReview, isDueForReview } from '../utils/spacedRepetition';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useFlashcards = () => {
  const { currentUser } = useAuth();
  const [flashcards, setFlashcards] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flippedState, setFlippedState] = useState<Record<string, boolean>>({});
  
  // Function to fetch flashcards from database
  const fetchFlashcards = useCallback(async () => {
    if (!currentUser) {
      setError("You must be logged in to study flashcards.");
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const allWords = await getAllWords(currentUser.uid);
      
      if (allWords.length === 0) {
        setError("No flashcards available. Add some words to get started.");
        setIsLoading(false);
        return;
      }
      
      // Smart word selection: max 12 words per session
      const MAX_WORDS_PER_SESSION = 12;
      let finalWords: VocabularyWord[] = [];
      
      // Check if there are selected flashcards in session storage
      const selectedFlashcardIds = sessionStorage.getItem('selectedFlashcards');
      
      if (selectedFlashcardIds) {
        try {
          const selectedIds = JSON.parse(selectedFlashcardIds);
          if (Array.isArray(selectedIds) && selectedIds.length > 0) {
            // Filter words to only include those selected that need review
            const selectedWords = allWords.filter(word => {
              if (!selectedIds.includes(word.id)) return false;
              
              // Apply SRS logic even to selected words - don't include mastered words unless due for review
              if (word.masteryLevel >= 5) {
                // For mastered words, check if they're due for review
                return isDueForReview(word.lastReviewed, word.masteryLevel, word.nextReviewDate);
              }
              return true;
            });
            
            finalWords = selectedWords.slice(0, MAX_WORDS_PER_SESSION);
          }
        } catch (parseError) {
          console.error("Error parsing selected flashcards:", parseError);
          // Continue with normal flow if there was an error
        }
      }
      
      // If we don't have enough words from selection, fill up with SRS prioritized words
      if (finalWords.length < MAX_WORDS_PER_SESSION) {
        const prioritizedWords = prioritizeWordsForReview(allWords);
        const remainingSlots = MAX_WORDS_PER_SESSION - finalWords.length;
        
        // Add words that are not already in finalWords, prioritizing learning words
        const existingIds = new Set(finalWords.map(word => word.id));
        const availableWords = prioritizedWords.filter(word => !existingIds.has(word.id));
        
        // First, get learning words
        const learningWords = availableWords.filter(word => word.status === 'learning');
        const otherWords = availableWords.filter(word => word.status !== 'learning');
        
        // Take learning words first, then fill remaining slots with other words
        const additionalWords = [
          ...learningWords.slice(0, remainingSlots),
          ...otherWords.slice(0, Math.max(0, remainingSlots - learningWords.length))
        ];
        
        finalWords = [...finalWords, ...additionalWords];
      }
      
      setFlashcards(finalWords);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      setError("Failed to load flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);
  
  // Load flashcards from database
  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);
  
  // Navigation functions
  const nextCard = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, flashcards.length]);
  
  const prevCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }, [currentIndex]);
  
  // Flip card
  const flipCard = useCallback((id: string) => {

    setFlippedState(prev => {
      const newState = {
        ...prev,
        [id]: !prev[id]
      };
      return newState;
    });
  }, []);
  
  // Shuffle cards
  const shuffleCards = useCallback(() => {
    setFlashcards(shuffleArray(flashcards));
    setCurrentIndex(0);
    setFlippedState({});
  }, [flashcards]);
  
  // Mark card with new mastery level
  const markCard = useCallback((id: string, newMasteryLevel: number) => {
    setFlashcards(prev => {
      return prev.map(card => {
        if (card.id === id) {
          // Update status based on mastery level
          let newStatus: 'new' | 'learning' | 'mastered' = card.status;
          if (newMasteryLevel >= 5) {
            newStatus = 'mastered';
          } else if (newMasteryLevel > 0) {
            newStatus = 'learning';
          } else {
            newStatus = 'new';
          }
          
          return { 
            ...card, 
            masteryLevel: newMasteryLevel,
            status: newStatus
          };
        }
        return card;
      });
    });
  }, []);

  // Remove mastered words from current session
  const removeMasteredWordFromSession = useCallback((wordId: string) => {
    setFlashcards(prev => {
      const cardIndex = prev.findIndex(card => card.id === wordId);
      if (cardIndex === -1) return prev;
      
      const newFlashcards = prev.filter(card => card.id !== wordId);
      
      // Update current index based on which card was removed
      setCurrentIndex(prevIndex => {
        // If we removed a card before the current index, decrease current index
        if (cardIndex < prevIndex) {
          return Math.max(0, prevIndex - 1);
        }
        // If we removed the current card and it's the last card, go to previous card
        if (cardIndex === prevIndex && prevIndex === newFlashcards.length) {
          return Math.max(0, prevIndex - 1);
        }
        return prevIndex;
      });
      
      return newFlashcards;
    });
  }, []);

  // Remove word from selected flashcards in sessionStorage when mastered
  const removeFromSelectedFlashcards = useCallback((wordId: string) => {
    try {
      const selectedFlashcardIds = sessionStorage.getItem('selectedFlashcards');
      if (selectedFlashcardIds) {
        const selectedIds = JSON.parse(selectedFlashcardIds);
        if (Array.isArray(selectedIds)) {
          const updatedIds = selectedIds.filter(id => id !== wordId);
          if (updatedIds.length > 0) {
            sessionStorage.setItem('selectedFlashcards', JSON.stringify(updatedIds));
          } else {
            sessionStorage.removeItem('selectedFlashcards');
          }
        }
      }
    } catch (error) {
      console.error('Error updating selected flashcards in sessionStorage:', error);
    }
  }, []);
  
  // Reset study session
  const resetSession = useCallback(async () => {
    setCurrentIndex(0);
    setFlippedState({});
    
    // Force clear any cached state
    setFlashcards([]);
    setError(null);
    setIsLoading(true);
    
    // Add a delay to ensure database writes are fully committed
    // and any Firebase caching is refreshed
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reload flashcards from database to get updated data
    await fetchFlashcards();
  }, [fetchFlashcards]);
  
  return {
    flashcards,
    currentIndex,
    currentWord: flashcards[currentIndex],
    totalFlashcards: flashcards.length,
    isLoading,
    error,
    isFlipped: (id: string) => flippedState[id] || false,
    nextCard,
    prevCard,
    flipCard,
    shuffleCards,
    markCard,
    removeFromSelectedFlashcards,
    removeMasteredWordFromSession,
    resetSession
  };
};
