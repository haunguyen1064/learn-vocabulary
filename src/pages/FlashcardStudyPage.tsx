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
    totalFlashcards, 
    isLoading, 
    error,
    nextCard,
    prevCard,
    shuffleCards,
    markCard,
    isFlipped,
    flipCard
  } = useFlashcards();

  const [studySessionTime, setStudySessionTime] = useState(0);
  const [startTime] = useState(Date.now());

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

  const handleDifficult = async (word: VocabularyWord) => {
    if (!currentUser) return;
    
    try {
      // Not well memorized - use performance 'difficult'
      await updateWordMasteryWithPerformance(currentUser.uid, word.id, 'difficult');
      
      // Mark card as updated (decrease mastery level)
      const newMasteryLevel = Math.max(0, word.masteryLevel - 1);
      markCard(word.id, newMasteryLevel);
      
      // Move to the next card
      nextCard();
    } catch (err) {
      console.error('Error marking word as difficult:', err);
    }
  };

  const handleKnown = async (word: VocabularyWord) => {
    if (!currentUser) return;
    
    try {
      // Already memorized - use performance 'ok'
      await updateWordMasteryWithPerformance(currentUser.uid, word.id, 'ok');
      
      // Mark card as updated (increase mastery level moderately)
      const newMasteryLevel = Math.min(5, word.masteryLevel + 1);
      markCard(word.id, newMasteryLevel);
      
      // Move to the next card
      nextCard();
    } catch (err) {
      console.error('Error marking word as known:', err);
    }
  };

  const handleSkip = async (word: VocabularyWord) => {
    if (!currentUser) return;
    
    try {
      // Already know this word, skip - use performance 'easy'
      await updateWordMasteryWithPerformance(currentUser.uid, word.id, 'easy');
      
      // Mark card as updated (set to mastered)
      markCard(word.id, 5);
      
      // Move to the next card
      nextCard();
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
          Return to Dashboard
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

  return (
    <div className="container mx-auto px-4 py-8">
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
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-600">
          Card {currentIndex + 1} of {totalFlashcards}
        </span>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center max-w-2xl">
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
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
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
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="flex space-x-3 justify-center w-full">
          <button 
            onClick={() => handleDifficult(currentWord)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium text-sm"
          >
            ← Chưa nhớ kỹ
          </button>
          <button 
            onClick={() => handleSkip(currentWord)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium text-sm"
          >
            ↑ Bỏ qua
          </button>
          <button 
            onClick={() => handleKnown(currentWord)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium text-sm"
          >
            → Đã nhớ
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Study Progress</h3>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-indigo-600 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalFlashcards) * 100}%` }}
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
