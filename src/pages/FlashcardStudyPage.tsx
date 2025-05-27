import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import { useFlashcards } from '../hooks/useFlashcards';
import { useAuth } from '../context/AuthContext';
import type { VocabularyWord } from '../types/vocabulary';
import { updateUserStudyStats, updateWordMasteryWithPerformance } from '../services/vocabularyService';

const FlashcardStudyPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { 
    flashcards, 
    currentIndex, 
    isLoading, 
    error,
    nextCard,
    shuffleCards,
    markCard,
    isFlipped,
    flipCard,
    removeFromSelectedFlashcards,
    removeMasteredWordFromSession,
    resetSession
  } = useFlashcards();

  const [studySessionTime, setStudySessionTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    totalCards: 0,
    difficultCards: 0,
    knownCards: 0,
    skippedCards: 0
  });
  const [showInstructions, setShowInstructions] = useState(true);
  const [swipeCount, setSwipeCount] = useState(0);

  // Record study time
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTimeInMinutes = Math.floor((currentTime - startTime) / 60000);
      setStudySessionTime(elapsedTimeInMinutes);
    }, 60000); // Update every minute
    
    return () => {
      clearInterval(timerInterval);
      
      // Save study stats when leaving page
      if (currentUser && studySessionTime > 0) {
        updateUserStudyStats(currentUser.uid, { 
          totalStudyTime: studySessionTime,
          lastStudySession: new Date()
        });
      }
    };
  }, [currentUser, startTime, studySessionTime]);

  // Initialize total cards count when flashcards are loaded
  useEffect(() => {
    if (flashcards.length > 0 && completionStats.totalCards === 0) {
      setCompletionStats(prev => ({
        ...prev,
        totalCards: flashcards.length
      }));
    }
  }, [flashcards.length, completionStats.totalCards]);

  const handleSwipeAction = () => {
    const newSwipeCount = swipeCount + 1;
    setSwipeCount(newSwipeCount);
    
    // Auto-hide instructions after 3 swipes
    if (newSwipeCount >= 3 && showInstructions) {
      setShowInstructions(false);
    }
  };

  const handleDifficult = async (word: VocabularyWord) => {
    if (!currentUser) return;
    
    handleSwipeAction(); // Track swipe for instruction auto-hide
    
    try {
      // Not well memorized - use performance 'difficult'
      await updateWordMasteryWithPerformance(currentUser.uid, word.id, 'difficult');
      
      // Mark card as updated (decrease mastery level)
      const newMasteryLevel = Math.max(0, word.masteryLevel - 1);
      markCard(word.id, newMasteryLevel);
      
      // Update stats and check completion
      setCompletionStats(prev => {
        const newStats = {
          ...prev,
          difficultCards: prev.difficultCards + 1
        };
        
        // Check if session completed with new stats
        const totalProcessedCards = newStats.difficultCards + newStats.knownCards + newStats.skippedCards;
        if (totalProcessedCards >= newStats.totalCards || flashcards.length === 0) {
          setTimeout(() => setIsSessionCompleted(true), 0);
        } else {
          setTimeout(() => nextCard(), 0);
        }
        
        return newStats;
      });
    } catch (err) {
      console.error('Error marking word as difficult:', err);
    }
  };

  const handleKnown = async (word: VocabularyWord) => {
    if (!currentUser) return;
    
    handleSwipeAction(); // Track swipe for instruction auto-hide
    
    try {
      // Already memorized - use performance 'ok'
      await updateWordMasteryWithPerformance(currentUser.uid, word.id, 'ok');
      
      // Mark card as updated (increase mastery level moderately)
      const newMasteryLevel = Math.min(5, word.masteryLevel + 1);
      markCard(word.id, newMasteryLevel);
      
      // Update stats and check completion
      setCompletionStats(prev => {
        const newStats = {
          ...prev,
          knownCards: prev.knownCards + 1
        };
        
        // Check if session completed with new stats
        const totalProcessedCards = newStats.difficultCards + newStats.knownCards + newStats.skippedCards;
        if (totalProcessedCards >= newStats.totalCards || flashcards.length === 0) {
          setTimeout(() => setIsSessionCompleted(true), 0);
        } else {
          setTimeout(() => nextCard(), 0);
        }
        
        return newStats;
      });
    } catch (err) {
      console.error('Error marking word as known:', err);
    }
  };

  const handleSkip = async (word: VocabularyWord) => {
    if (!currentUser) return;
    
    handleSwipeAction(); // Track swipe for instruction auto-hide
    
    try {
      // Already know this word, skip - use performance 'easy'
      await updateWordMasteryWithPerformance(currentUser.uid, word.id, 'easy');
      
      // Mark card as updated (set to mastered)
      markCard(word.id, 5);
      
      // Remove from selected flashcards since it's now mastered
      removeFromSelectedFlashcards(word.id);
      
      // Remove the mastered word from current session
      removeMasteredWordFromSession(word.id);
      
      // Update stats and check completion
      setCompletionStats(prev => {
        const newStats = {
          ...prev,
          skippedCards: prev.skippedCards + 1
        };
        
        // Check if session completed with new stats
        const totalProcessedCards = newStats.difficultCards + newStats.knownCards + newStats.skippedCards;
        if (totalProcessedCards >= newStats.totalCards) {
          setTimeout(() => setIsSessionCompleted(true), 0);
        }
        // Note: Don't call nextCard() here since removeMasteredWordFromSession handles index adjustment
        
        return newStats;
      });
    } catch (err) {
      console.error('Error skipping word:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Flashcards</h2>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Flashcards Available</h2>
        <p className="text-gray-600">There are no flashcards to study right now.</p>
        <button 
          onClick={() => navigate('/add-word')} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Words
        </button>
      </div>
    );
  }

  const currentWord = flashcards[currentIndex];

  // Show completion screen if session is completed
  if (isSessionCompleted) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Completion Header */}
          <div className="mb-8">
            <div className="mx-auto mb-4 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎉 Study Session Complete!</h1>
            <p className="text-lg text-gray-600">Great job! You've finished studying all flashcards.</p>
          </div>

          {/* Study Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{completionStats.totalCards}</div>
                <div className="text-sm text-blue-800">Total Cards</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{completionStats.difficultCards}</div>
                <div className="text-sm text-red-800">Need Review</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completionStats.knownCards}</div>
                <div className="text-sm text-green-800">Memorized</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{completionStats.skippedCards}</div>
                <div className="text-sm text-gray-800">Skipped</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <div className="text-lg font-semibold text-indigo-800">Study Time: {studySessionTime} minutes</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={async () => {
                setIsSessionCompleted(false);
                setCompletionStats({
                  totalCards: 0,
                  difficultCards: 0,
                  knownCards: 0,
                  skippedCards: 0
                });
                // Reset instruction panel state for new session
                setShowInstructions(true);
                setSwipeCount(0);
                // Reset to first card for new session using SPA-friendly method
                await resetSession();
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium text-sm transition-colors"
            >
              Study Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium text-sm transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Study Flashcards</h1>
        <div className="flex space-x-4">
          <button 
            onClick={shuffleCards}
            className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Shuffle Cards
          </button>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-600">
          Card {Math.min((completionStats.difficultCards + completionStats.knownCards + completionStats.skippedCards) + 1, completionStats.totalCards)} of {completionStats.totalCards}
        </span>
      </div>

      <div className="flex justify-center mb-6">
        {showInstructions && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center max-w-2xl relative">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
              aria-label="Hide instructions"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-sm text-blue-700 mb-2">
              💡 <strong>Hướng dẫn:</strong> Click để lật thẻ
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs text-blue-600">
              <div className="bg-red-100 p-2 rounded">
                <span className="text-red-700">← Trái:</span> Chưa nhớ kỹ
              </div>
              <div className="bg-green-100 p-2 rounded">
                <span className="text-green-700">→ Phải:</span> Đã nhớ
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="text-gray-700">↑ Lên:</span> Bỏ qua
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {currentWord && (
            <Flashcard 
              key={currentWord.id}
              word={currentWord} 
              isFlipped={isFlipped(currentWord.id)}
              onFlip={() => {
                flipCard(currentWord.id);
              }}
              onSwipeLeft={() => handleDifficult(currentWord)}   // Not well memorized
              onSwipeRight={() => handleKnown(currentWord)}      // Already memorized
              onSwipeUp={() => handleSkip(currentWord)}          // Skip
            />
          )}
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Study Progress</h3>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-indigo-600 rounded-full"
            style={{ 
              width: `${completionStats.totalCards > 0 
                ? Math.min(((completionStats.difficultCards + completionStats.knownCards + completionStats.skippedCards) / completionStats.totalCards) * 100, 100)
                : 0}%` 
            }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Study time: {studySessionTime} minutes
        </p>
      </div>
    </div>
  );
};

export default FlashcardStudyPage;
