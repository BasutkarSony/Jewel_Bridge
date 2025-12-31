import React, { createContext, useContext, useState, useCallback } from 'react';

type UserRole = 'customer' | 'shopkeeper' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city?: string;
  shopId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'shopkeeper';
  city: string;
  area?: string;
  phone?: string;
  shopName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string, role: UserRole): Promise<boolean> => {
    // Simulated login
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser({
      id: 'user-1',
      name: role === 'shopkeeper' ? 'Shop Owner' : 'Customer',
      email,
      role,
      city: 'Hyderabad',
      shopId: role === 'shopkeeper' ? 'shop-1' : undefined,
    });
    return true;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    // Simulated registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      city: data.city,
      shopId: data.role === 'shopkeeper' ? `shop-${Date.now()}` : undefined,
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
