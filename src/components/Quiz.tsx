import React, { useEffect, useState } from 'react';
import type { QuizQuestion } from '../types/vocabulary';
import { motion } from 'framer-motion';

interface QuizProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  onAnswer: (wordId: string, selectedIndex: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, currentQuestionIndex, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null);
    setShowFeedback(false);
  }, [currentQuestionIndex]);
  
  if (!currentQuestion) {
    return <div>No question available</div>;
  }
  
  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return; // Prevent selecting after answer is submitted
    
    setSelectedOption(optionIndex);
    setIsCorrect(optionIndex === currentQuestion.correctAnswerIndex);
    setShowFeedback(true);
    
    // Submit answer after a delay to allow user to see feedback
    setTimeout(() => {
      onAnswer(currentQuestion.wordId, optionIndex);
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <h2 className="text-2xl font-bold mt-2">What is the meaning of:</h2>
          <div className="flex items-center">
            <h3 className="text-3xl font-bold text-indigo-600 my-4">{currentQuestion.word.word}</h3>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {currentQuestion.word.partOfSpeech}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedOption === index
                  ? showFeedback
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
              onClick={() => handleOptionSelect(index)}
              disabled={showFeedback}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  selectedOption === index
                    ? showFeedback
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Feedback section */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="flex items-center">
              {isCorrect ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-green-700">Correct!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium text-red-700">
                    Incorrect. The correct answer is: {currentQuestion.options[currentQuestion.correctAnswerIndex]}
                  </span>
                </>
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm italic">"{currentQuestion.word.example}"</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Quiz;
