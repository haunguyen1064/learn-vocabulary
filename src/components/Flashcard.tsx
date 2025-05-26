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
        className={`relative w-full max-w-md h-64 rounded-xl shadow-lg hover:shadow-xl border ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-gray-200 hover:border-indigo-200'} transition-all duration-300`}
        onClick={() => {
          if (onFlip) {
            onFlip();
          }
        }}
        style={{ cursor: (onFlip) ? 'pointer' : 'default' }}
      >
        <div 
            className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? 'transform rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
        
        >
          {/* Front side of the card */}
          <div className="absolute w-full h-full rounded-xl p-6 flex flex-col justify-center items-center bg-white text-gray-800"
              style={{ backfaceVisibility: 'hidden' }}>
            <h2 className="text-2xl font-bold mb-2">{word.word}</h2>
            <div className="inline-block px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm mb-4">
              {word.partOfSpeech}
            </div>
            <p className="text-gray-700">{word.meaning}</p>
            
            {/* Selection checkbox */}
            {onSelect && (
              <div className="absolute top-4 right-4" onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation();
                onSelect(); 
                }}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-sm ${
                  isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300 hover:border-indigo-400'
                }`}>
                  {isSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Back side of the card */}
          <div  className="absolute w-full h-full rounded-xl p-6 flex flex-col justify-center items-center bg-indigo-600 text-white"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
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
