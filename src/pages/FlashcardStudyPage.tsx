import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Flashcard from '../components/Flashcard';
import { useFlashcards } from '../hooks/useFlashcards';
import { useAuth } from '../context/AuthContext';
import type { VocabularyWord } from '../types/vocabulary';
import { updateWordMasteryLevel, updateUserStudyStats } from '../services/vocabularyService';

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

  const handleMastery = async (word: VocabularyWord, masteryLevel: number) => {
    if (!currentUser) return;
    
    try {
      const newMasteryLevel = Math.min(5, Math.max(0, word.masteryLevel + masteryLevel));
      
      // Update the word's mastery level
      await updateWordMasteryLevel(currentUser.uid, word.id, newMasteryLevel);
      
      // Mark card as updated
      markCard(word.id, newMasteryLevel);
      
      // Move to the next card
      nextCard();
    } catch (err) {
      console.error('Error updating mastery level:', err);
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

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard 
              word={currentWord} 
              isFlipped={isFlipped(currentWord.id)}
              onFlip={() => {
                flipCard(currentWord.id);
              }}
              // No onSelect prop here, so clicking on the card will use onFlip
            />
          </motion.div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button 
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-md ${currentIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          <button 
            onClick={() => handleMastery(currentWord, -1)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Hard
          </button>
          <button 
            onClick={() => handleMastery(currentWord, 0)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
          >
            Good
          </button>
          <button 
            onClick={() => handleMastery(currentWord, 1)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Easy
          </button>
        </div>

        <button 
          onClick={nextCard}
          disabled={currentIndex === totalFlashcards - 1}
          className={`px-4 py-2 rounded-md ${currentIndex === totalFlashcards - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          Next
        </button>
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
