import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVocabulary } from '../context/VocabularyContext';
import { getAllWords } from '../services/vocabularyService';

const HomePage: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const { refreshTrigger } = useVocabulary();
  const [wordStats, setWordStats] = useState({
    total: 0,
    new: 0,
    learning: 0,
    mastered: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }
    
    try {
      // Load user words
      const words = await getAllWords(currentUser.uid);
      
      // Calculate word stats
      const stats = {
        total: words.length,
        new: words.filter(word => word.status === 'new').length,
        learning: words.filter(word => word.status === 'learning').length,
        mastered: words.filter(word => word.status === 'mastered').length
      };
      
      setWordStats(stats);
    } catch (error) {
      console.error("Error loading home page data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadData();
  }, [loadData, refreshTrigger]); // Add refreshTrigger as dependency
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to VocaFlash</h1>
          <p className="text-xl text-gray-600 mb-8">Improve your vocabulary with flashcards, spaced repetition, and personalized learning.</p>
          <div className="space-x-4">
            <Link to="/register" className="btn btn-primary text-lg px-6 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary text-lg px-6 py-3">
              Sign In
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Flashcards</h2>
              <p className="text-gray-600">Create interactive flashcards with words, definitions, and example sentences.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Smart Practice</h2>
              <p className="text-gray-600">Practice with intelligent quizzes that adapt to your learning progress.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Track Progress</h2>
              <p className="text-gray-600">Monitor your learning journey with detailed statistics and progress tracking.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hi, {userData?.displayName || currentUser.email}</h1>
        <p className="text-gray-600">Here's your vocabulary learning progress</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 cursor-default select-none">
          <h3 className="text-lg font-medium text-gray-500">Total Words</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{wordStats.total}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 cursor-default select-none">
          <h3 className="text-lg font-medium text-gray-500">New</h3>
          <div className="flex items-end mt-2">
            <p className="text-3xl font-bold text-blue-600">{wordStats.new}</p>
            <p className="text-gray-500 ml-2 mb-1">words</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 cursor-default select-none">
          <h3 className="text-lg font-medium text-gray-500">Learning</h3>
          <div className="flex items-end mt-2">
            <p className="text-3xl font-bold text-yellow-600">{wordStats.learning}</p>
            <p className="text-gray-500 ml-2 mb-1">words</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 cursor-default select-none">
          <h3 className="text-lg font-medium text-gray-500">Mastered</h3>
          <div className="flex items-end mt-2">
            <p className="text-3xl font-bold text-green-600">{wordStats.mastered}</p>
            <p className="text-gray-500 ml-2 mb-1">words</p>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/add-word" className="btn btn-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Word
        </Link>
        
        <Link to="/select-flashcards" className="btn btn-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          Study Flashcards
        </Link>
        
        <Link to="/quiz" className="btn btn-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Practice Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
