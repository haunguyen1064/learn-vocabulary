import { AuthProvider, useAuth } from './context/AuthContext'
import { VocabularyProvider } from './context/VocabularyContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FlashcardStudyPage from './pages/FlashcardStudyPage'
import QuizPage from './pages/QuizPage'
import CollectionsPage from './pages/CollectionsPage'
import AddWordPage from './pages/AddWordPage'
import SelectFlashcardsPage from './pages/SelectFlashcardsPage'
import './App.css'

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <VocabularyProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/select-flashcards" element={<ProtectedRoute><SelectFlashcardsPage /></ProtectedRoute>} />
              <Route path="/flashcards" element={<ProtectedRoute><FlashcardStudyPage /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
              <Route path="/collections" element={<ProtectedRoute><CollectionsPage /></ProtectedRoute>} />
              <Route path="/add-word" element={<ProtectedRoute><AddWordPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
      </VocabularyProvider>
    </AuthProvider>
  )
}

export default App
