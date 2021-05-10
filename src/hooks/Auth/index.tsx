import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../../services/api';

interface SignInCredentials {
  user: string;
  module: string;
}

interface AuthState {
  token: string;
  user: User | null;
}
interface User {
  name: string;
  login: string;
  email: string;
  active: boolean;
}

interface AuthContextData {
  user: User | null;
  signIn(credentials: SignInCredentials): Promise<User>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@pdamodules::token');
    const user = localStorage.getItem('@pdamodules::user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {
      token: 'aa',
      user: null,
    } as AuthState;
  });

  const signIn = useCallback(async ({ module, user }: SignInCredentials) => {
    try {
      const response = await api.get(`/User/${user}`);
      if (response.data.name) {
        const userToStore = {
          name: response.data.name,
          login: response.data.login,
          email: response.data.email,
          active: response.data.active,
        };

        localStorage.setItem('@pdamodules::token', 'a');
        localStorage.setItem('@pdamodules::user', JSON.stringify(userToStore));

        setData({
          token: 'a',
          user: userToStore,
        });
        return userToStore as User;
      }
      throw new Error(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@pdamodules::token');
    localStorage.removeItem('@pdamodules::user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
