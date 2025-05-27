import {
  BrainCircuit,
  LogOut
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'VocaFlash' }) => {
  const { currentUser, logoutUser, userData } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md mr-2">
              <BrainCircuit size={24} className="text-white" strokeWidth={2} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </Link>
          
          <nav className="ml-8 hidden sm:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              </li>
              <li>
                <Link to="/flashcards" className="text-gray-600 hover:text-gray-900">Study</Link>
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
          {currentUser && userData ? (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-3">{userData.displayName}</span>
              <button 
                onClick={logoutUser}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={18} />
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
