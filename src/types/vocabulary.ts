export interface VocabularyWord {
  id: string;
  word: string;
  partOfSpeech: string; // noun, verb, adjective, etc.
  pronunciation?: string; // IPA pronunciation, e.g., "/ʃɪp/"
  category: string; // e.g., "animals", "food", "contracts"
  meaning: string;
  example: string;
  status: WordStatus;
  masteryLevel: number; // 0-5, 0 = not started, 5 = mastered
  lastReviewed?: Date;
  nextReviewDate?: Date; // When this word should be reviewed next
  timesReviewed: number;
  timesCorrect: number;
}

export type WordStatus = 'new' | 'learning' | 'mastered';

export interface Collection {
  id: string;
  name: string;
  description?: string;
  words: string[]; // Array of word IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  collections: string[]; // Array of collection IDs
  wordStatus: Record<string, WordStatus>; // Map of word ID to status
  masteryLevels: Record<string, number>; // Map of word ID to mastery level
  studyStats: StudyStats;
}

export interface StudyStats {
  totalWordsLearned: number;
  totalWordsMastered: number;
  totalStudySessions: number;
  totalStudyTime: number; // in minutes
  lastStudySession?: Date;
  dailyStreak: number;
}

export interface QuizQuestion {
  wordId: string;
  word: VocabularyWord;
  options: string[]; // Array of possible meanings (includes the correct one)
  correctAnswerIndex: number;
}
