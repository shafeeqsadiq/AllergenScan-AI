// client/src/context/AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  user: { token: string } | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // In AuthContext.tsx, modify the useEffect:
useEffect(() => {
  const checkAuth = async () => {
    // Add this line to clear token during development/testing
    await AsyncStorage.removeItem('userToken');
    
    const token = await AsyncStorage.getItem('userToken');
    setUser(token ? { token } : null);
    setLoading(false);
  };
  checkAuth();
}, []);


  const login = async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    setUser({ token });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
