import { db } from "./firebase";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import type { VocabularyWord, Collection, WordStatus } from "../types/vocabulary";

// Collections in Firestore
const COLLECTIONS_COLLECTION = "collections";
const WORDS_COLLECTION = "words";
const USERS_COLLECTION = "users";

// Vocabulary words functions
export const getAllWords = async (userId: string): Promise<VocabularyWord[]> => {
  try {
    const wordsQuery = query(collection(db, WORDS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(wordsQuery);
    
    const words: VocabularyWord[] = [];
    querySnapshot.forEach((doc) => {
      words.push({ id: doc.id, ...doc.data() } as VocabularyWord);
    });
    
    return words;
  } catch (error) {
    console.error("Error getting words:", error);
    throw error;
  }
};

export const getWordsByStatus = async (userId: string, status: WordStatus): Promise<VocabularyWord[]> => {
  try {
    const wordsQuery = query(
      collection(db, WORDS_COLLECTION),
      where("userId", "==", userId),
      where("status", "==", status)
    );
    
    const querySnapshot = await getDocs(wordsQuery);
    
    const words: VocabularyWord[] = [];
    querySnapshot.forEach((doc) => {
      words.push({ id: doc.id, ...doc.data() } as VocabularyWord);
    });
    
    return words;
  } catch (error) {
    console.error(`Error getting ${status} words:`, error);
    throw error;
  }
};

export const getWordById = async (wordId: string): Promise<VocabularyWord | null> => {
  try {
    const wordDoc = await getDoc(doc(db, WORDS_COLLECTION, wordId));
    
    if (wordDoc.exists()) {
      return { id: wordDoc.id, ...wordDoc.data() } as VocabularyWord;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting word by ID:", error);
    throw error;
  }
};

export const addWord = async (userId: string, wordData: Omit<VocabularyWord, "id">): Promise<string> => {
  try {
    const newWordRef = doc(collection(db, WORDS_COLLECTION));
    await setDoc(newWordRef, { ...wordData, userId });
    return newWordRef.id;
  } catch (error) {
    console.error("Error adding word:", error);
    throw error;
  }
};

export const updateWord = async (wordId: string, wordData: Partial<VocabularyWord>): Promise<void> => {
  try {
    await updateDoc(doc(db, WORDS_COLLECTION, wordId), wordData);
  } catch (error) {
    console.error("Error updating word:", error);
    throw error;
  }
};

export const updateWordStatus = async (wordId: string, status: WordStatus, masteryLevel: number): Promise<void> => {
  try {
    await updateDoc(doc(db, WORDS_COLLECTION, wordId), {
      status,
      masteryLevel,
      lastReviewed: new Date()
    });
  } catch (error) {
    console.error("Error updating word status:", error);
    throw error;
  }
};

export const deleteWord = async (wordId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, WORDS_COLLECTION, wordId));
  } catch (error) {
    console.error("Error deleting word:", error);
    throw error;
  }
};

// Collection functions
export const getUserCollections = async (userId: string): Promise<Collection[]> => {
  try {
    const collectionsQuery = query(
      collection(db, COLLECTIONS_COLLECTION),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(collectionsQuery);
    
    const collections: Collection[] = [];
    querySnapshot.forEach((doc) => {
      collections.push({ id: doc.id, ...doc.data() } as Collection);
    });
    
    return collections;
  } catch (error) {
    console.error("Error getting user collections:", error);
    throw error;
  }
};

export const createCollection = async (userId: string, collectionData: Partial<Collection>): Promise<Collection> => {
  try {
    const newCollectionRef = doc(collection(db, COLLECTIONS_COLLECTION));
    
    const newCollection = {
      name: collectionData.name || "New Collection",
      description: collectionData.description || "",
      words: collectionData.words || [],
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(newCollectionRef, newCollection);
    
    // Add the collection ID to the user's collections array
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      collections: arrayUnion(newCollectionRef.id)
    });
    
    return {
      ...newCollection, 
      id: newCollectionRef.id
    } as Collection;
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
};

export const addWordToCollection = async (userId: string, collectionId: string, wordId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, COLLECTIONS_COLLECTION, collectionId), {
      words: arrayUnion(wordId),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error adding word to collection:", error);
    throw error;
  }
};

export const removeWordFromCollection = async (userId: string, collectionId: string, wordId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, COLLECTIONS_COLLECTION, collectionId), {
      words: arrayRemove(wordId),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error removing word from collection:", error);
    throw error;
  }
};

export const deleteCollection = async (userId: string, collectionId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS_COLLECTION, collectionId));
    
    // Remove the collection ID from the user's collections array
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      collections: arrayRemove(collectionId)
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    throw error;
  }
};

// Study progress functions
export const updateWordMasteryLevel = async (userId: string, wordId: string, newMasteryLevel: number): Promise<void> => {
  try {
    const wordRef = doc(db, WORDS_COLLECTION, wordId);
    const wordDoc = await getDoc(wordRef);
    
    if (!wordDoc.exists()) {
      throw new Error(`Word with ID ${wordId} does not exist`);
    }
    
    const wordData = wordDoc.data() as VocabularyWord;
    let newStatus: WordStatus = wordData.status;
    
    // Update word status based on mastery level
    if (newMasteryLevel >= 5) {
      newStatus = 'mastered';
    } else if (newMasteryLevel > 0) {
      newStatus = 'learning';
    } else {
      newStatus = 'new';
    }
    
    await updateDoc(wordRef, {
      masteryLevel: newMasteryLevel,
      status: newStatus,
      lastReviewed: new Date(),
      timesReviewed: (wordData.timesReviewed || 0) + 1,
    });
    
    // Update user's word status map
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      [`wordStatus.${wordId}`]: newStatus,
      [`masteryLevels.${wordId}`]: newMasteryLevel
    });
  } catch (error) {
    console.error("Error updating word mastery level:", error);
    throw error;
  }
};

export const updateUserStudyStats = async (userId: string, statsUpdate: Partial<{
  totalStudyTime: number;
  totalStudySessions: number;
  lastStudySession: Date;
}>): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
    
    const userData = userDoc.data();
    const currentStats = userData.studyStats || {
      totalWordsLearned: 0,
      totalWordsMastered: 0,
      totalStudySessions: 0,
      totalStudyTime: 0,
      dailyStreak: 0
    };
    
    // Update stats
    const updatedStats = {
      ...currentStats,
    };
    
    if (statsUpdate.totalStudyTime) {
      updatedStats.totalStudyTime = (currentStats.totalStudyTime || 0) + statsUpdate.totalStudyTime;
    }
    
    if (statsUpdate.totalStudySessions) {
      updatedStats.totalStudySessions = (currentStats.totalStudySessions || 0) + statsUpdate.totalStudySessions;
    }
    
    if (statsUpdate.lastStudySession) {
      updatedStats.lastStudySession = statsUpdate.lastStudySession;
      
      // Update daily streak if necessary
      const lastSession = userData.studyStats?.lastStudySession ? new Date(userData.studyStats.lastStudySession) : null;
      const today = new Date();
      
      if (lastSession) {
        const lastSessionDay = new Date(lastSession).setHours(0, 0, 0, 0);
        const todayDay = new Date(today).setHours(0, 0, 0, 0);
        const yesterdayDay = new Date(todayDay);
        yesterdayDay.setDate(yesterdayDay.getDate() - 1);
        
        if (lastSessionDay < yesterdayDay) {
          // Streak broken, reset to 1
          updatedStats.dailyStreak = 1;
        } else if (lastSessionDay < todayDay) {
          // Yesterday, streak continues
          updatedStats.dailyStreak = (currentStats.dailyStreak || 0) + 1;
        }
        // If same day, streak remains the same
      } else {
        // First study session, start streak at 1
        updatedStats.dailyStreak = 1;
      }
    }
    
    await updateDoc(userRef, {
      studyStats: updatedStats
    });
  } catch (error) {
    console.error("Error updating user study stats:", error);
    throw error;
  }
};
