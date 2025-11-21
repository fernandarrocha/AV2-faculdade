import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  getAuthHeader: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [credentials, setCredentials] = useState<string>('');

  useEffect(() => {
    // Verificar se há credenciais salvas
    const savedCreds = localStorage.getItem('authCredentials');
    const savedUser = localStorage.getItem('authUser');
    if (savedCreds && savedUser) {
      setCredentials(savedCreds);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Criar header de autenticação básica
      const authHeader = 'Basic ' + btoa(`${username}:${password}`);
      
      // Testar autenticação fazendo uma requisição simples
      const response = await fetch('http://localhost:8080/api/alunos', {
        headers: {
          'Authorization': authHeader,
        },
      });

      if (response.ok) {
        const userData: User = {
          username,
          roles: username === 'admin' ? ['ADMIN', 'USER'] : ['USER'],
        };
        
        setUser(userData);
        setCredentials(authHeader);
        localStorage.setItem('authCredentials', authHeader);
        localStorage.setItem('authUser', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCredentials('');
    localStorage.removeItem('authCredentials');
    localStorage.removeItem('authUser');
  };

  const getAuthHeader = () => credentials;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
