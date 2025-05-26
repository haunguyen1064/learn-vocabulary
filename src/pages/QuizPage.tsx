import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Quiz from '../components/Quiz';
import { useAuth } from '../context/AuthContext';
import { getAllWords, updateWordMasteryLevel, updateUserStudyStats } from '../services/vocabularyService';
import type { QuizQuestion, VocabularyWord } from '../types/vocabulary';

const QuizPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [startTime] = useState(Date.now());
  
  useEffect(() => {
    const fetchWords = async () => {
      if (!currentUser) {
        return;
      }

      try {
        setIsLoading(true);
        const words = await getAllWords(currentUser.uid);
        
        // Filter out words with status "new" - only test on words being learned
        const testableWords = words.filter(word => word.status !== 'new');
        
        if (testableWords.length < 4) {
          setError("You need at least 4 words in your vocabulary to take a quiz. Add more words or study your existing ones first.");
          setIsLoading(false);
          return;
        }
        
        const quizQuestions = generateQuizQuestions(testableWords);
        setQuestions(quizQuestions);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching words for quiz:", err);
        setError("Failed to load quiz. Please try again.");
        setIsLoading(false);
      }
    };

    fetchWords();
  }, [currentUser]);
  
  // Save study time when leaving the page
  useEffect(() => {
    return () => {
      if (currentUser && !isLoading && !error) {
        const currentTime = Date.now();
        const timeSpentInMinutes = Math.floor((currentTime - startTime) / 60000);
        
        if (timeSpentInMinutes > 0) {
          updateUserStudyStats(currentUser.uid, {
            totalStudyTime: timeSpentInMinutes,
            lastStudySession: new Date(),
            totalStudySessions: 1
          });
        }
      }
    };
  }, [currentUser, isLoading, error, startTime]);

  const generateQuizQuestions = (words: VocabularyWord[]): QuizQuestion[] => {
    const quizQuestions: QuizQuestion[] = [];
    
    // Create a copy of words array to shuffle
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    
    // Take the first 10 words or all if less than 10
    const selectedWords = shuffledWords.slice(0, 10);
    
    // For each word, create a quiz question
    selectedWords.forEach(word => {
      // Get 3 random incorrect options from other words
      const otherWords = words.filter(w => w.id !== word.id);
      const incorrectOptions = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.meaning);
      
      // Add correct answer and shuffle options
      const options = [...incorrectOptions, word.meaning].sort(() => Math.random() - 0.5);
      
      // Find the index of the correct answer
      const correctAnswerIndex = options.indexOf(word.meaning);
      
      quizQuestions.push({
        wordId: word.id,
        word,
        options,
        correctAnswerIndex
      });
    });
    
    return quizQuestions;
  };

  const handleAnswer = async (_wordId: string, selectedIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
    
    // Update score
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Mark question as answered
    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestion.wordId]: isCorrect
    });
    
    // Update mastery level if user answered correctly
    if (isCorrect && currentUser) {
      const masteryChange = isCorrect ? 1 : -1;
      const newMasteryLevel = Math.min(5, Math.max(0, currentQuestion.word.masteryLevel + masteryChange));
      
      await updateWordMasteryLevel(
        currentUser.uid, 
        currentQuestion.wordId, 
        newMasteryLevel
      );
    }
    
    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 1000);
    }
  };
  
  const restartQuiz = () => {
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions({});
    
    // Re-shuffle questions
    setQuestions(prevQuestions => [...prevQuestions].sort(() => Math.random() - 0.5));
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

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
          
          <div className="mb-8 text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">{score}/{questions.length}</div>
            <p className="text-xl text-gray-700">Your score: {percentage}%</p>
            
            <div className="mt-4 h-4 bg-gray-200 rounded-full">
              <div 
                className={`h-4 rounded-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <p className="mt-4 text-gray-600">
              {percentage >= 80 ? 'Excellent! You\'re mastering these words.' :
               percentage >= 60 ? 'Good job! Keep practicing to improve.' :
               'Keep studying! You\'ll improve with more practice.'}
            </p>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <button 
              onClick={restartQuiz} 
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Retry Quiz
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Vocabulary Quiz</h1>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-indigo-600 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <motion.div
        key={currentQuestion.wordId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Quiz 
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
        />
      </motion.div>
    </div>
  );
};

export default QuizPage;
