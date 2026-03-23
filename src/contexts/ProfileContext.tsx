import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// The logged-in user (constant unless logging out)
export interface User {
  id: string;
  name: string;
  email: string;
}

// A profile that the user can access and switch between
export interface Profile {
  id: string;
  name: string;
  email: string;
  isOwn?: boolean; // True if this is the user's own profile
  ownerId: string; // Which user owns this profile
}

interface ProfileContextType {
  loggedInUser: User; // The user who is logged in
  currentProfile: Profile; // The active profile being viewed
  availableProfiles: Profile[]; // All profiles the logged-in user can access
  switchProfile: (profileId: string) => void;
  isSwitchingProfile: boolean;
  switchToUser: (userId: string) => void; // Switch to a different logged-in user (admin tool)
  isSwitchingUser: boolean; // Loading state when switching users
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// All users in the system
const allUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@holmen.com',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@holmen.com',
  },
  {
    id: '3',
    name: 'Mike Snow',
    email: 'mike.snow@holmen.com',
  },
];

// All profiles in the system
const allProfiles: { [userId: string]: Profile[] } = {
  '1': [ // John Doe's accessible profiles
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@holmen.com',
      isOwn: true,
      ownerId: '1',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@holmen.com',
      isOwn: false,
      ownerId: '2', // Jane owns this profile, but John has access
    },
  ],
  '2': [ // Jane Doe's accessible profiles
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@holmen.com',
      isOwn: true,
      ownerId: '2',
    },
  ],
  '3': [ // Mike Snow's accessible profiles (only Jane Doe's, no own profile)
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@holmen.com',
      isOwn: false,
      ownerId: '2',
    },
  ],
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  console.log('[PROFILE CONTEXT] ProfileProvider initializing');
  
  const [loggedInUser, setLoggedInUser] = useState<User>(() => {
    // Load from localStorage if available
    const savedUserId = localStorage.getItem('loggedInUserId');
    console.log('[PROFILE CONTEXT] Saved user ID from localStorage:', savedUserId);
    const user = allUsers.find(u => u.id === savedUserId) || allUsers[0];
    console.log('[PROFILE CONTEXT] Initial user:', user);
    return user;
  });
  
  const [currentProfile, setCurrentProfile] = useState<Profile>(() => {
    // Load from localStorage if available
    const savedProfileId = localStorage.getItem('currentProfileId');
    console.log('[PROFILE CONTEXT] Saved profile ID from localStorage:', savedProfileId);
    const profile = allProfiles[loggedInUser.id].find(p => p.id === savedProfileId) || allProfiles[loggedInUser.id][0];
    console.log('[PROFILE CONTEXT] Initial profile:', profile);
    return profile;
  });
  const [isSwitchingProfile, setIsSwitchingProfile] = useState(false);
  const [isSwitchingUser, setIsSwitchingUser] = useState(false);
  
  console.log('[PROFILE CONTEXT] Current state - profile:', currentProfile.name, 'isSwitching:', isSwitchingProfile);

  const switchProfile = (profileId: string) => {
    console.log('[PROFILE CONTEXT] switchProfile called with profileId:', profileId);
    const profile = allProfiles[loggedInUser.id].find(p => p.id === profileId);
    if (profile) {
      console.log('[PROFILE CONTEXT] Switching to profile:', profile.name);
      setIsSwitchingProfile(true);
      
      // Save to localStorage
      localStorage.setItem('currentProfileId', profileId);
      
      // Update profile after a small delay to show loading screen
      setTimeout(() => {
        console.log('[PROFILE CONTEXT] Profile switch complete, updating state');
        setCurrentProfile(profile);
        setIsSwitchingProfile(false);
      }, 800);
    }
  };

  const switchToUser = (userId: string) => {
    console.log('[PROFILE CONTEXT] switchToUser called with userId:', userId);
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      console.log('[PROFILE CONTEXT] Switching to user:', user.name);
      setLoggedInUser(user);
      setIsSwitchingUser(true);
      
      // Save to localStorage
      localStorage.setItem('loggedInUserId', userId);
      
      // Update profile after a small delay to show loading screen
      setTimeout(() => {
        console.log('[PROFILE CONTEXT] User switch complete, updating state');
        setCurrentProfile(allProfiles[userId][0]);
        setIsSwitchingUser(false);
      }, 800);
    }
  };

  return (
    <ProfileContext.Provider value={{ 
      loggedInUser, 
      currentProfile, 
      availableProfiles: allProfiles[loggedInUser.id], 
      switchProfile, 
      isSwitchingProfile,
      switchToUser,
      isSwitchingUser
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}