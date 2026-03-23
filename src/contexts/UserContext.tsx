import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  relation?: string; // e.g., "Sambo", "Partner"
}

interface UserContextType {
  currentUser: User;
  availableUsers: User[];
  switchUser: (userId: string) => void;
  isSwitchingUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@holmen.com',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@holmen.com',
    relation: 'Sambo',
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  console.log('[USER CONTEXT] UserProvider initializing');
  
  const [currentUser, setCurrentUser] = useState<User>(() => {
    // Load from localStorage if available
    const savedUserId = localStorage.getItem('currentUserId');
    console.log('[USER CONTEXT] Saved user ID from localStorage:', savedUserId);
    const user = users.find(u => u.id === savedUserId) || users[0];
    console.log('[USER CONTEXT] Initial user:', user);
    return user;
  });
  const [isSwitchingUser, setIsSwitchingUser] = useState(false);
  
  console.log('[USER CONTEXT] Current state - user:', currentUser.name, 'isSwitching:', isSwitchingUser);

  const switchUser = (userId: string) => {
    console.log('[USER CONTEXT] switchUser called with userId:', userId);
    const user = users.find(u => u.id === userId);
    if (user) {
      console.log('[USER CONTEXT] Switching to user:', user.name);
      setIsSwitchingUser(true);
      
      // Save to localStorage
      localStorage.setItem('currentUserId', userId);
      
      // Update user after a small delay to show loading screen
      setTimeout(() => {
        console.log('[USER CONTEXT] User switch complete, updating state');
        setCurrentUser(user);
        setIsSwitchingUser(false);
      }, 800);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, availableUsers: users, switchUser, isSwitchingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}