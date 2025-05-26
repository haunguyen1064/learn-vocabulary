import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getUserCollections, createCollection, deleteCollection, addWordToCollection, removeWordFromCollection } from '../services/vocabularyService';
import { getAllWords } from '../services/vocabularyService';
import type { Collection, VocabularyWord } from '../types/vocabulary';

const CollectionsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [collectionWords, setCollectionWords] = useState<VocabularyWord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        setIsLoading(true);
        const [userCollections, userWords] = await Promise.all([
          getUserCollections(currentUser.uid),
          getAllWords(currentUser.uid)
        ]);
        
        setCollections(userCollections);
        setWords(userWords);
        
        // If there's at least one collection, select it by default
        if (userCollections.length > 0) {
          setSelectedCollection(userCollections[0]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load collections. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);
  
  // When selected collection changes, update the collection words
  useEffect(() => {
    if (selectedCollection && words.length > 0) {
      const wordsInCollection = words.filter(word => 
        selectedCollection.words.includes(word.id)
      );
      setCollectionWords(wordsInCollection);
    } else {
      setCollectionWords([]);
    }
  }, [selectedCollection, words]);

  const handleCreateCollection = async () => {
    if (!currentUser || !newCollectionName.trim()) return;
    
    try {
      const newCollection: Partial<Collection> = {
        name: newCollectionName.trim(),
        description: newCollectionDescription.trim() || undefined,
        words: [],
      };
      
      const createdCollection = await createCollection(currentUser.uid, newCollection);
      
      setCollections([...collections, createdCollection as Collection]);
      setNewCollectionName('');
      setNewCollectionDescription('');
      setIsCreatingCollection(false);
      setSelectedCollection(createdCollection as Collection);
    } catch (err) {
      console.error("Error creating collection:", err);
      setError("Failed to create collection. Please try again.");
    }
  };
  
  const handleDeleteCollection = async () => {
    if (!currentUser || !selectedCollection) return;
    
    try {
      await deleteCollection(currentUser.uid, selectedCollection.id);
      
      const updatedCollections = collections.filter(c => c.id !== selectedCollection.id);
      setCollections(updatedCollections);
      
      if (updatedCollections.length > 0) {
        setSelectedCollection(updatedCollections[0]);
      } else {
        setSelectedCollection(null);
      }
    } catch (err) {
      console.error("Error deleting collection:", err);
      setError("Failed to delete collection. Please try again.");
    }
  };
  
  const handleAddWordToCollection = async (wordId: string) => {
    if (!currentUser || !selectedCollection) return;
    
    try {
      await addWordToCollection(currentUser.uid, selectedCollection.id, wordId);
      
      // Update local state
      const updatedCollection = {
        ...selectedCollection,
        words: [...selectedCollection.words, wordId]
      };
      
      setCollections(collections.map(c => 
        c.id === selectedCollection.id ? updatedCollection : c
      ));
      
      setSelectedCollection(updatedCollection);
    } catch (err) {
      console.error("Error adding word to collection:", err);
      setError("Failed to add word to collection. Please try again.");
    }
  };
  
  const handleRemoveWordFromCollection = async (wordId: string) => {
    if (!currentUser || !selectedCollection) return;
    
    try {
      await removeWordFromCollection(currentUser.uid, selectedCollection.id, wordId);
      
      // Update local state
      const updatedCollection = {
        ...selectedCollection,
        words: selectedCollection.words.filter(id => id !== wordId)
      };
      
      setCollections(collections.map(c => 
        c.id === selectedCollection.id ? updatedCollection : c
      ));
      
      setSelectedCollection(updatedCollection);
      setCollectionWords(collectionWords.filter(word => word.id !== wordId));
    } catch (err) {
      console.error("Error removing word from collection:", err);
      setError("Failed to remove word from collection. Please try again.");
    }
  };
  
  const getAvailableWords = () => {
    if (!selectedCollection) return [];
    
    return words.filter(word => !selectedCollection.words.includes(word.id));
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My Vocabulary Collections</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsCreatingCollection(!isCreatingCollection)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {isCreatingCollection ? 'Cancel' : 'New Collection'}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {isCreatingCollection && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow mb-6"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Collection</h2>
          <div className="mb-4">
            <label htmlFor="collection-name" className="block text-sm font-medium text-gray-700 mb-1">
              Collection Name
            </label>
            <input
              type="text"
              id="collection-name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="My English Phrasal Verbs"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="collection-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="collection-description"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
              rows={2}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Words I need to learn for my English exam"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCreateCollection}
              disabled={!newCollectionName.trim()}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white ${!newCollectionName.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              Create Collection
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Collections List */}
        <div className="md:col-span-3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Collections</h2>
          
          {collections.length === 0 ? (
            <p className="text-gray-500 text-sm">No collections yet. Create your first collection to organize your vocabulary.</p>
          ) : (
            <ul className="space-y-2">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <button
                    onClick={() => setSelectedCollection(collection)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedCollection?.id === collection.id
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{collection.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {collection.words.length}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Collection Details */}
        <div className="md:col-span-9 bg-white p-6 rounded-lg shadow">
          {selectedCollection ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedCollection.name}</h2>
                  {selectedCollection.description && (
                    <p className="text-gray-600 text-sm mt-1">{selectedCollection.description}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    {collectionWords.length} words • Created on {new Date(selectedCollection.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  onClick={handleDeleteCollection}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete Collection
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Words in this Collection</h3>
                
                {collectionWords.length === 0 ? (
                  <p className="text-gray-500">No words in this collection yet. Add words from your vocabulary to this collection.</p>
                ) : (
                  <div className="bg-gray-50 rounded-md p-4">
                    <ul className="divide-y divide-gray-200">
                      {collectionWords.map((word) => (
                        <li key={word.id} className="py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-md font-medium">{word.word}</h4>
                              <p className="text-sm text-gray-600">{word.partOfSpeech} - {word.meaning}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveWordFromCollection(word.id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Add Words to Collection</h3>
                
                {getAvailableWords().length === 0 ? (
                  <p className="text-gray-500">No more words available to add. Add new words to your vocabulary first.</p>
                ) : (
                  <div className="bg-gray-50 rounded-md p-4 max-h-80 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {getAvailableWords().map((word) => (
                        <li key={word.id} className="py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-md font-medium">{word.word}</h4>
                              <p className="text-sm text-gray-600">{word.partOfSpeech} - {word.meaning}</p>
                            </div>
                            <button
                              onClick={() => handleAddWordToCollection(word.id)}
                              className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                              Add
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Select a collection or create a new one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
