'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

export interface AdminTeamUser {
  email: string;
  passcode: string;
  addedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  adminTeamUsers: AdminTeamUser[];
  loginWithPasscode: (passcode: string) => boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  addAdminTeamUser: (email: string) => { email: string; passcode: string };
  removeAdminTeamUser: (email: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN_TEAM: AdminTeamUser[] = [
  { email: 'admin@dynamicilluminations.com', passcode: 'admi2026', addedAt: '2025-01-01' },
  { email: 'ahmed@dynamicilluminations.com', passcode: 'ahme2026', addedAt: '2025-01-01' },
];

export function generatePasscodeFromEmail(email: string): string {
  const prefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  const clean4 = (prefix.length >= 4 ? prefix.slice(0, 4) : prefix.padEnd(4, 'x')).toLowerCase();
  return `${clean4}2026`;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminTeamUsers, setAdminTeamUsers] = useState<AdminTeamUser[]>(DEFAULT_ADMIN_TEAM);

  useEffect(() => {
    // Load stored admin team members from localStorage
    const storedTeam = localStorage.getItem('di_admin_team_members');
    if (storedTeam) {
      try {
        const parsed = JSON.parse(storedTeam);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAdminTeamUsers(parsed);
        }
      } catch (e) {
        console.warn('Error parsing admin team members:', e);
      }
    }

    const storedAdmin = localStorage.getItem('di_admin_session');
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setIsAdmin(true);
        localStorage.setItem('di_admin_session', 'true');
      }
      setLoading(false);
    });

    setLoading(false);
    return () => unsubscribe();
  }, []);

  const saveTeamToStorage = (team: AdminTeamUser[]) => {
    setAdminTeamUsers(team);
    localStorage.setItem('di_admin_team_members', JSON.stringify(team));
  };

  const loginWithPasscode = (inputPasscode: string): boolean => {
    const trimmed = inputPasscode.trim();
    // Check against all registered team passcodes + master fallback
    const match = adminTeamUsers.find((u) => u.passcode.toLowerCase() === trimmed.toLowerCase());
    if (match || trimmed === 'dynamic2026' || trimmed === 'admi2026') {
      setIsAdmin(true);
      localStorage.setItem('di_admin_session', 'true');
      return true;
    }
    return false;
  };

  const loginWithEmail = async (email: string, pass: string) => {
    // Check if pass matches team generated passcode or firebase auth
    const userMatch = adminTeamUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (userMatch && userMatch.passcode === pass.trim()) {
      setIsAdmin(true);
      localStorage.setItem('di_admin_session', 'true');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsAdmin(true);
      localStorage.setItem('di_admin_session', 'true');
    } catch (e) {
      if (pass.trim() === 'dynamic2026' || (userMatch && userMatch.passcode === pass.trim())) {
        setIsAdmin(true);
        localStorage.setItem('di_admin_session', 'true');
        return;
      }
      throw e;
    }
  };

  const addAdminTeamUser = (email: string): { email: string; passcode: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const generatedPasscode = generatePasscodeFromEmail(cleanEmail);

    const existing = adminTeamUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { email: existing.email, passcode: existing.passcode };
    }

    const newUser: AdminTeamUser = {
      email: cleanEmail,
      passcode: generatedPasscode,
      addedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newUser, ...adminTeamUsers];
    saveTeamToStorage(updated);
    return { email: cleanEmail, passcode: generatedPasscode };
  };

  const removeAdminTeamUser = (email: string) => {
    const updated = adminTeamUsers.filter((u) => u.email.toLowerCase() !== email.trim().toLowerCase());
    saveTeamToStorage(updated);
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Signout warning:', e);
    }
    setIsAdmin(false);
    localStorage.removeItem('di_admin_session');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        adminTeamUsers,
        loginWithPasscode,
        loginWithEmail,
        addAdminTeamUser,
        removeAdminTeamUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
