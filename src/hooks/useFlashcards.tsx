import { useState, useCallback, useEffect } from 'react';
import type { VocabularyWord } from '../types/vocabulary';
import { getAllWords } from '../services/vocabularyService';
import { useAuth } from '../context/AuthContext';
import { prioritizeWordsForReview } from '../utils/spacedRepetition';

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
  
  // Load flashcards from database
  useEffect(() => {
    const fetchFlashcards = async () => {
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
        
        // Check if there are selected flashcards in session storage
        const selectedFlashcardIds = sessionStorage.getItem('selectedFlashcards');
        
        if (selectedFlashcardIds) {
          try {
            const selectedIds = JSON.parse(selectedFlashcardIds);
            if (Array.isArray(selectedIds) && selectedIds.length > 0) {
              // Filter words to only include those selected
              const selectedWords = allWords.filter(word => selectedIds.includes(word.id));
              
              if (selectedWords.length > 0) {
                setFlashcards(selectedWords);
                setIsLoading(false);
                return;
              }
            }
          } catch (parseError) {
            console.error("Error parsing selected flashcards:", parseError);
            // Continue with normal flow if there was an error
          }
        }
        
        // If no selection or error, prioritize words for review using the spaced repetition algorithm
        const prioritizedWords = prioritizeWordsForReview(allWords);
        setFlashcards(prioritizedWords);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setError("Failed to load flashcards. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFlashcards();
  }, [currentUser]);
  
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
    setFlashcards(prev => 
      prev.map(card => 
        card.id === id 
          ? { ...card, masteryLevel: newMasteryLevel } 
          : card
      )
    );
  }, []);
  
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
    markCard
  };
};
