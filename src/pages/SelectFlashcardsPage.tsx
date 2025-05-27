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
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'new' | 'learning' | 'mastered'>('new');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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
  
  const handleFlipCard = (wordId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [wordId]: !prev[wordId]
    }));
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

  const handleSelectCategory = (categoryWords: VocabularyWord[]) => {
    const categoryWordIds = categoryWords.map(word => word.id);
    const allCategorySelected = categoryWordIds.every(id => selectedWords.includes(id));
    
    if (allCategorySelected) {
      // Deselect all words in this category
      setSelectedWords(prev => prev.filter(id => !categoryWordIds.includes(id)));
    } else {
      // Select all words in this category
      setSelectedWords(prev => {
        const newSelected = new Set([...prev, ...categoryWordIds]);
        return Array.from(newSelected);
      });
    }
  };

  const toggleCategoryCollapse = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };
  
  const getFilteredWords = () => {
    return allWords.filter(word => word.status === statusFilter);
  };

  const getGroupedWords = () => {
    const filteredWords = getFilteredWords();
    const grouped = filteredWords.reduce((acc, word) => {
      const category = word.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(word);
      return acc;
    }, {} as Record<string, VocabularyWord[]>);
    
    // Sort categories alphabetically
    return Object.keys(grouped)
      .sort()
      .reduce((acc, category) => {
        acc[category] = grouped[category];
        return acc;
      }, {} as Record<string, VocabularyWord[]>);
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
  const groupedWords = getGroupedWords();
  const allSelected = filteredWords.length > 0 && selectedWords.length === filteredWords.length;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Select Flashcards to Study</h1>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-2 mb-4 sm:mb-0">
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
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Words Found</h2>
            <p className="text-gray-600">There are no words matching your current filter.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedWords).map(([category, words]) => {
            const isExpanded = expandedCategories.has(category);
            const categoryWordIds = words.map(word => word.id);
            const allCategorySelected = categoryWordIds.every(id => selectedWords.includes(id));
            const someCategorySelected = categoryWordIds.some(id => selectedWords.includes(id));
            
            return (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleCategoryCollapse(category)}
                        className="p-1 rounded-md hover:bg-gray-200 transition-colors duration-200"
                      >
                        <svg 
                          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <h2 className="text-lg font-semibold text-gray-800 capitalize">
                        {category}
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {words.length} word{words.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSelectCategory(words)}
                        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          allCategorySelected
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : someCategorySelected
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {allCategorySelected ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          )}
                        </svg>
                        {allCategorySelected ? 'Deselect All' : someCategorySelected ? 'Select Remaining' : 'Select All'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {words.map(word => (
                        <div key={word.id} className="relative transform transition-all duration-200 hover:scale-[1.02]">
                          <Flashcard 
                            word={word}
                            onSelect={() => handleSelectWord(word.id)}
                            isSelected={selectedWords.includes(word.id)}
                            isFlipped={!!flippedCards[word.id]}
                            onFlip={() => handleFlipCard(word.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectFlashcardsPage;
