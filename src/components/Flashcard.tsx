import React, { useState, useRef, useEffect } from 'react';
import type { VocabularyWord } from '../types/vocabulary';

interface FlashcardProps {
  word: VocabularyWord;
  isFlipped?: boolean;
  onFlip?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
  onSwipeLeft?: () => void;   // Not well memorized
  onSwipeRight?: () => void;  // Already memorized
  onSwipeUp?: () => void;     // Already know, skip
}

const Flashcard: React.FC<FlashcardProps> = ({
  word,
  isFlipped,
  onFlip,
  onSelect,
  isSelected = false,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle enter animation - card slides up from bottom
  useEffect(() => {
    // Force reset all states for new card
    setIsExiting(false);
    setIsDragging(false);
    setIsEntering(true);
    setIsMounted(false);
    
    // Start from below the screen
    setDragOffset({ x: 0, y: 300 });
    
    // Use double requestAnimationFrame to ensure the initial position is rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsMounted(true);
        
        // Animate to center position
        const timer = setTimeout(() => {
          setDragOffset({ x: 0, y: 0 });
          
          // Mark animation as complete
          setTimeout(() => {
            setIsEntering(false);
          }, 400);
        }, 50);
        
        return () => clearTimeout(timer);
      });
    });
  }, [word.id]); // Re-run when word changes

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEntering || isExiting) return; // Don't allow interaction during animations
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    
    // Check for swipe up first
    if (dragOffset.y < -threshold && onSwipeUp) {
      handleSwipeAction('up', onSwipeUp);
    } else if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0 && onSwipeRight) {
        // Swipe right - Already memorized
        handleSwipeAction('right', onSwipeRight);
      } else if (dragOffset.x < 0 && onSwipeLeft) {
        // Swipe left - Not well memorized
        handleSwipeAction('left', onSwipeLeft);
      }
    } else {
      // Click to flip if not swiping
      if (onFlip && Math.abs(dragOffset.x) < 10 && Math.abs(dragOffset.y) < 10) {
        onFlip();
      }
      // Reset position if no action
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleSwipeAction = (direction: 'left' | 'right' | 'up', callback: () => void) => {
    setIsDragging(false);
    setIsExiting(true);
    
    // Continue the swipe motion in the same direction to exit the screen
    const currentOffset = dragOffset;
    const exitDistance = 600; // Distance to fly off screen
    const exitOffset = direction === 'up' ? 
      { x: currentOffset.x, y: -exitDistance } : 
      direction === 'left' ? 
      { x: -exitDistance, y: currentOffset.y } : 
      { x: exitDistance, y: currentOffset.y };
    
    setDragOffset(exitOffset);
    
    // Call the callback after a very short delay to allow the exit animation to start smoothly
    setTimeout(() => {
      callback();
    }, 150); // Short delay to ensure exit animation starts
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEntering || isExiting) return; // Don't allow interaction during animations
    setIsDragging(true);
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    
    // Check for swipe up first
    if (dragOffset.y < -threshold && onSwipeUp) {
      handleSwipeAction('up', onSwipeUp);
    } else if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0 && onSwipeRight) {
        // Swipe right - Already memorized
        handleSwipeAction('right', onSwipeRight);
      } else if (dragOffset.x < 0 && onSwipeLeft) {
        // Swipe left - Not well memorized
        handleSwipeAction('left', onSwipeLeft);
      }
    } else {
      // Tap to flip if not swiping
      if (onFlip && Math.abs(dragOffset.x) < 10 && Math.abs(dragOffset.y) < 10) {
        onFlip();
      }
      // Reset position if no action
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    }
  };
  
  return (
    <div className="relative my-4 mx-auto max-w-md">
      <div 
        ref={cardRef}
        className={`relative w-full max-w-md h-64 rounded-xl shadow-lg hover:shadow-xl border ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-gray-200 hover:border-indigo-200'} transition-all duration-300 select-none ${
          isEntering || isExiting ? 'cursor-default' : 
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ 
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
          transition: isDragging ? 'none' : 
                     isExiting ? 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 
                     isEntering ? 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 
                     'transform 0.3s ease-out',
          opacity: isExiting ? 0 : 
                  isEntering && !isMounted ? 0 :
                  isEntering ? Math.min(1, 1 - Math.abs(dragOffset.y) / 400) :
                  Math.max(0.3, 1 - (Math.abs(dragOffset.x) + Math.abs(dragOffset.y)) / 300),
          pointerEvents: isExiting ? 'none' : 'auto',
          zIndex: isExiting ? -1 : 1
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
            className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? 'transform rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
        
        >
          {/* Front side of the card */}
          <div className="absolute w-full h-full rounded-xl p-6 flex flex-col justify-center items-center bg-white text-gray-800"
              style={{ backfaceVisibility: 'hidden' }}>
            <h2 className="text-2xl font-bold mb-2">{word.word}</h2>
            
            {/* Pronunciation display */}
            {word.pronunciation && (
              <div className="text-gray-500 text-sm mb-2 italic">
                {word.pronunciation}
              </div>
            )}
            
            <div className="inline-block px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm mb-4">
              {word.partOfSpeech}
            </div>
            
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
          <div  className="absolute w-full h-full rounded-xl p-4 flex flex-col justify-center items-center bg-indigo-600 text-white"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="text-center space-y-4 max-w-full">
              {/* Meaning section */}
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-indigo-100 mb-2 uppercase tracking-wide">Meaning</h3>
                <p className="text-lg leading-relaxed">{word.meaning}</p>
              </div>
              
              {/* Example section */}
              {word.example && (
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-indigo-100 mb-2 uppercase tracking-wide">Example</h3>
                  <p className="text-base italic leading-relaxed">"{word.example}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Swipe indicators */}
        {isDragging && !isExiting && !isEntering && (
          <>
            {/* Up swipe indicator - Already know, skip */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80 rounded-xl transition-opacity ${
                dragOffset.y < -50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white text-xl font-bold">
                ↑ Bỏ qua
              </div>
            </div>
            
            {/* Left swipe indicator - Not well memorized */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-80 rounded-xl transition-opacity ${
                dragOffset.x < -50 && Math.abs(dragOffset.y) < 50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white text-xl font-bold">
                ← Chưa nhớ kỹ
              </div>
            </div>
            
            {/* Right swipe indicator - Already memorized */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-80 rounded-xl transition-opacity ${
                dragOffset.x > 50 && Math.abs(dragOffset.y) < 50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white text-xl font-bold">
                → Đã nhớ
              </div>
            </div>
          </>
        )}
        
        {/* Status badge - moved inside the card */}
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
        
        {/* Mastery indicator - moved inside the card */}
        <div className="absolute bottom-2 left-2 flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full mx-0.5 ${
                i < word.masteryLevel ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
