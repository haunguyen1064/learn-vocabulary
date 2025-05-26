import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChangedListener, getUserData, logoutUser as firebaseLogout } from '../services/firebase';
import type { User as AppUser } from '../types/vocabulary';

interface AuthContextType {
  currentUser: User | null;
  userData: Partial<AppUser> | null;
  isLoading: boolean;
  setUserData: (data: Partial<AppUser>) => void;
  logoutUser: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  isLoading: true,
  setUserData: () => {},
  logoutUser: async () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<Partial<AppUser> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const data = await getUserData(user.uid);
          setUserData(data as Partial<AppUser>);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        setUserData(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const logoutUser = async () => {
    try {
      await firebaseLogout();
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
      return false;
    }
  };
  
  const value = {
    currentUser,
    userData,
    isLoading,
    setUserData,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
