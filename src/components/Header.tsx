import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'VocaFlash' }) => {
  const { currentUser, logoutUser } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </Link>
          
          <nav className="ml-8 hidden sm:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              </li>
              <li>
                <Link to="/flashcards" className="text-gray-600 hover:text-gray-900">Flashcards</Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 hover:text-gray-900">Practice</Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-gray-900">Collections</Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div>
          {currentUser ? (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4">{currentUser.email}</span>
              <button 
                onClick={logoutUser}
                className="text-sm px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="text-sm px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">
                Sign In
              </Link>
              <Link to="/register" className="text-sm px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
