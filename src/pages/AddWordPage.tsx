import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addWord, getAllWords } from '../services/vocabularyService';
import type { VocabularyWord } from '../types/vocabulary';

const AddWordPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [word, setWord] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('noun');
  const [pronunciation, setPronunciation] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [existingWords, setExistingWords] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordExists, setWordExists] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchExistingWords = async () => {
      if (!currentUser) return;
      
      try {
        const words = await getAllWords(currentUser.uid);
        setExistingWords(words.map(w => w.word.toLowerCase()));
      } catch (err) {
        console.error("Error fetching words:", err);
      }
    };
    
    fetchExistingWords();
  }, [currentUser]);
  
  useEffect(() => {
    // Check if word already exists when user types
    if (word.trim()) {
      setWordExists(existingWords.includes(word.trim().toLowerCase()));
    } else {
      setWordExists(false);
    }
  }, [word, existingWords]);

  const partOfSpeechOptions = [
    'noun',
    'verb',
    'adjective',
    'adverb',
    'pronoun',
    'preposition',
    'conjunction',
    'interjection',
    'phrasal verb'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError("You must be logged in to add words.");
      return;
    }
    
    if (wordExists) {
      setError("This word already exists in your vocabulary.");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const newWord: Omit<VocabularyWord, "id"> = {
        word: word.trim(),
        partOfSpeech,
        pronunciation: pronunciation.trim() || undefined,
        meaning: meaning.trim(),
        example: example.trim(),
        status: 'new',
        masteryLevel: 0,
        timesReviewed: 0,
        timesCorrect: 0
      };
      
      await addWord(currentUser.uid, newWord);
      
      setSuccessMessage(`"${word}" has been added to your vocabulary.`);
      
      // Reset form
      setWord('');
      setPartOfSpeech('noun');
      setPronunciation('');
      setMeaning('');
      setExample('');
      
      // Add the new word to existing words list
      setExistingWords([...existingWords, word.trim().toLowerCase()]);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error adding new word:", err);
      setError("Failed to add word. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Add New Word</h1>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Home
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-1">
              Word
            </label>
            <input
              id="word"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className={`shadow-sm h-10 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${wordExists ? 'border-red-500' : ''}`}
              placeholder="e.g., home, car"
              required
            />
            {wordExists && (
              <p className="mt-1 text-sm text-red-600">This word already exists in your vocabulary.</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="part-of-speech" className="block text-sm font-medium text-gray-700 mb-1">
              Part of Speech
            </label>
            <select
              id="part-of-speech"
              value={partOfSpeech}
              onChange={(e) => setPartOfSpeech(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              {partOfSpeechOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="pronunciation" className="block text-sm font-medium text-gray-700 mb-1">
              Pronunciation <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              id="pronunciation"
              type="text"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              className="shadow-sm h-10 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g., /ʃɪp/, /hoʊm/"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use IPA notation or phonetic spelling
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 mb-1">
              Meaning
            </label>
            <textarea
              id="meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              rows={2}
              className="shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="The definition of the word"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-1">
              Example Sentence
            </label>
            <textarea
              id="example"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              rows={2}
              className="shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="An example sentence using this word"
              required
            />
          </div>
          
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setWord('');
                setPartOfSpeech('noun');
                setPronunciation('');
                setMeaning('');
                setExample('');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting || wordExists}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(isSubmitting || wordExists) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Adding...' : 'Add Word'}
            </button>
          </div>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Tips for adding words</h2>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Use clear and concise definitions</li>
            <li>Include example sentences that show how the word is used in context</li>
            <li>Add related words or synonyms in your notes</li>
            <li>For phrasal verbs, make sure to include all common variations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddWordPage;
