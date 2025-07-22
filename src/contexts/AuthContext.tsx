
"use client";

import type { User } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  loginAsSeller: (email: string, pass: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'role'> & {password: string}) => Promise<boolean>;
  registerAsSeller: (userData: Omit<User, 'id' | 'role'> & {password: string}) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<Omit<User, 'role' | 'id' | 'email'>>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('elysianUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: 'user123', name: 'Demo Buyer', email, role: 'buyer' };
    setUser(mockUser);
    localStorage.setItem('elysianUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const loginAsSeller = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: 'seller456', name: 'Demo Seller', email, role: 'seller' };
    setUser(mockUser);
    localStorage.setItem('elysianUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (userData: Omit<User, 'id' | 'role'> & {password: string}): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = { id: `user-${Date.now()}`, name: userData.name, email: userData.email, address: userData.address, role: 'buyer' };
    setUser(newUser);
    localStorage.setItem('elysianUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const registerAsSeller = async (userData: Omit<User, 'id' | 'role'> & {password: string}): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newSeller: User = { id: `seller-${Date.now()}`, name: userData.name, email: userData.email, role: 'seller' };
    setUser(newSeller);
    localStorage.setItem('elysianUser', JSON.stringify(newSeller));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elysianUser');
    router.push('/');
  };

  const updateProfile = async (userData: Partial<Omit<User, 'role' | 'id' | 'email'>>): Promise<boolean> => {
    if (!user) return false;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('elysianUser', JSON.stringify(updatedUser));
    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsSeller, register, registerAsSeller, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
