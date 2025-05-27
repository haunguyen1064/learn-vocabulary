// This is a utility file for implementing the spaced repetition algorithm
// It calculates when a word should next be reviewed based on its mastery level

import type { VocabularyWord } from '../types/vocabulary';

// Initial intervals between reviews in days
const BASE_INTERVALS = {
  0: 0,   // New words should be reviewed immediately
  1: 1,   // Level 1: review after 1 day
  2: 3,   // Level 2: review after 3 days
  3: 7,   // Level 3: review after 1 week
  4: 14,  // Level 4: review after 2 weeks
  5: 30,  // Level 5: review after 1 month
};

// Adjustments based on previous performance
const EASE_FACTOR = {
  difficult: 0.6,  // Reduce interval for difficult words
  ok: 1.0,         // Standard interval
  easy: 1.5,       // Increase interval for easy words
};

// Calculate next review date
export const calculateNextReviewDate = (
  currentMasteryLevel: number, 
  performance: 'difficult' | 'ok' | 'easy'
): Date => {
  const baseInterval = BASE_INTERVALS[currentMasteryLevel as keyof typeof BASE_INTERVALS] || 0;
  const easeFactor = EASE_FACTOR[performance];
  const intervalInDays = baseInterval * easeFactor;
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + Math.round(intervalInDays));
  
  return nextDate;
};

// Determine if a word is due for review
export const isDueForReview = (lastReviewed: Date | undefined, masteryLevel: number, nextReviewDate?: Date): boolean => {
  // If we have a nextReviewDate, use it
  if (nextReviewDate) {
    const now = new Date();
    return now >= nextReviewDate;
  }
  
  // Fallback to old logic if no nextReviewDate
  if (!lastReviewed) return true; // Never reviewed before
  
  const now = new Date();
  const daysSinceReview = Math.floor((now.getTime() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24));
  const baseInterval = BASE_INTERVALS[masteryLevel as keyof typeof BASE_INTERVALS] || 0;
  
  return daysSinceReview >= baseInterval;
};

// Calculate mastery level adjustment based on answer correctness
export const calculateMasteryAdjustment = (
  isCorrect: boolean, 
  currentMasteryLevel: number
): number => {
  if (isCorrect) {
    return Math.min(5, currentMasteryLevel + 1);
  } else {
    return Math.max(0, currentMasteryLevel - 1);
  }
};

// Prioritize words for review
export const prioritizeWordsForReview = (words: VocabularyWord[]): VocabularyWord[] => {
  // First, filter out fully mastered words (masteryLevel = 5 and not due for review)
  const filteredWords = words.filter(word => {
    // Include word if it's not mastered yet (masteryLevel < 5)
    if (word.masteryLevel < 5) return true;
    
    // Include mastered words only if they are due for review
    return isDueForReview(word.lastReviewed, word.masteryLevel, word.nextReviewDate);
  });

  return filteredWords.sort((a, b) => {
    // First, sort by due or not due
    const aIsDue = isDueForReview(a.lastReviewed, a.masteryLevel, a.nextReviewDate);
    const bIsDue = isDueForReview(b.lastReviewed, b.masteryLevel, b.nextReviewDate);
    
    if (aIsDue !== bIsDue) {
      return aIsDue ? -1 : 1;
    }
    
    // Then by mastery level (lower first)
    if (a.masteryLevel !== b.masteryLevel) {
      return a.masteryLevel - b.masteryLevel;
    }
    
    // Then by date last reviewed (oldest first)
    const aDate = a.lastReviewed ? new Date(a.lastReviewed).getTime() : 0;
    const bDate = b.lastReviewed ? new Date(b.lastReviewed).getTime() : 0;
    
    return aDate - bDate;
  });
};
