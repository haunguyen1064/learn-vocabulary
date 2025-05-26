import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllWords } from '../services/vocabularyService';
import Flashcard from '../components/Flashcard';
import type { VocabularyWord } from '../types/vocabulary';

const SelectFlashcardsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [allWords, setAllWords] = useState<VocabularyWord[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'learning' | 'mastered'>('all');

  useEffect(() => {
    const loadWords = async () => {
      if (!currentUser) {
        return;
      }
      
      try {
        setIsLoading(true);
        const words = await getAllWords(currentUser.uid);
        setAllWords(words);
      } catch (err) {
        console.error("Error loading words:", err);
        setError("Failed to load vocabulary words. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWords();
  }, [currentUser]);
  
  const handleSelectWord = (wordId: string) => {
    setSelectedWords(prev => {
      if (prev.includes(wordId)) {
        return prev.filter(id => id !== wordId);
      } else {
        return [...prev, wordId];
      }
    });
  };
  
  const handleSelectAll = () => {
    const filteredWords = getFilteredWords();
    if (selectedWords.length === filteredWords.length) {
      // If all are selected, deselect all
      setSelectedWords([]);
    } else {
      // Otherwise, select all filtered words
      setSelectedWords(filteredWords.map(word => word.id));
    }
  };
  
  const getFilteredWords = () => {
    if (statusFilter === 'all') {
      return allWords;
    }
    return allWords.filter(word => word.status === statusFilter);
  };
  
  const startStudy = () => {
    if (selectedWords.length === 0) {
      return;
    }
    
    // Store selected words in session storage so FlashcardStudyPage can access them
    sessionStorage.setItem('selectedFlashcards', JSON.stringify(selectedWords));
    navigate('/flashcards');
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
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const filteredWords = getFilteredWords();
  const allSelected = filteredWords.length > 0 && selectedWords.length === filteredWords.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Select Flashcards to Study</h1>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'new' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setStatusFilter('learning')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'learning' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Learning
          </button>
          <button
            onClick={() => setStatusFilter('mastered')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'mastered' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Mastered
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={startStudy}
            disabled={selectedWords.length === 0}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedWords.length === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Study Selected ({selectedWords.length})
          </button>
        </div>
      </div>

      {filteredWords.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Words Found</h2>
          <p className="text-gray-600 mb-4">There are no words matching your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWords.map(word => (
            <div key={word.id} className="relative">
              <Flashcard 
                word={word}
                onSelect={() => handleSelectWord(word.id)}
                isSelected={selectedWords.includes(word.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectFlashcardsPage;
