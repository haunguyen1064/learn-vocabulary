import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { setVocabularyRefreshCallback } from '../services/vocabularyService';

interface VocabularyContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

export const VocabularyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Set up the global refresh callback when the provider mounts
  useEffect(() => {
    setVocabularyRefreshCallback(triggerRefresh);
    
    // Cleanup on unmount
    return () => {
      setVocabularyRefreshCallback(() => {});
    };
  }, []);

  return (
    <VocabularyContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </VocabularyContext.Provider>
  );
};

export const useVocabulary = () => {
  const context = useContext(VocabularyContext);
  if (context === undefined) {
    throw new Error('useVocabulary must be used within a VocabularyProvider');
  }
  return context;
};
