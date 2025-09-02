'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';




type Role = 'admin' | 'user';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role?: Role
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();


  // const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
  // Load user from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
        setLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: identifier, password }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Login failed');
    }

    const data = await response.json();
    console.log(data);

    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));

    // Redirect based on role
    if (data.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: Role = 'user'
  ) => {
    const response = await fetch('http://localhost:8080/api/customers/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phoneNumber, password, role }),
    });


    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Signup failed');
    }

    // Auto-login after signup
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


