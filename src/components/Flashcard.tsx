import React from 'react';
import type { VocabularyWord } from '../types/vocabulary';

interface FlashcardProps {
  word: VocabularyWord;
  isFlipped?: boolean;
  onFlip?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  word,
  isFlipped,
  onFlip,
  onSelect,
  isSelected = false
}) => {
  return (
    <div className="relative my-4 mx-auto">
      <div 
        className="flashcard mx-auto" 
        onClick={onFlip}
      >
        <div className={`flashcard-inner ${isFlipped ? 'transform [transform:rotateY(180deg)]' : ''}`}>
          {/* Front side of the card */}
          <div className="flashcard-front">
            <h2 className="text-2xl font-bold mb-2">{word.word}</h2>
            <div className="inline-block px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm mb-4">
              {word.partOfSpeech}
            </div>
            <p className="text-gray-700">{word.meaning}</p>
            
            {onSelect && (
              <div 
                className="absolute top-4 right-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                  {isSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Back side of the card */}
          <div className="flashcard-back">
            <p className="text-lg mb-2">Example:</p>
            <p className="text-white italic">"{word.example}"</p>
          </div>
        </div>
      </div>
      
      {/* Mastery indicator */}
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${
              i < word.masteryLevel ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Status badge */}
      <div className="absolute bottom-2 right-2">
        <span 
          className={`text-xs px-2 py-1 rounded-full ${
            word.status === 'new' ? 'bg-blue-100 text-blue-800' : 
            word.status === 'learning' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'
          }`}
        >
          {word.status}
        </span>
      </div>
    </div>
  );
};

export default Flashcard;
