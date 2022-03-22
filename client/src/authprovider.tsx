import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth, LoginData } from "./services/auth";
import { UserType } from "./services/types";


interface AuthContextType {
  user: UserType | null;
  error: string;
  signin: ({ email, password }: LoginData, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

function defaultUser(){
  const user = localStorage.getItem('user');

  if(user){
    return JSON.parse(user) || null;
  }
  
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<UserType | null>(defaultUser());
  let [error, setError] = useState<string>('');

  let signin = ({ email, password }: LoginData, callback: VoidFunction) => {
    return auth.signin({ email, password }, (user, error) => {
      setUser(user);
      setError(error);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return auth.signout(() => {
      setUser(null);
      setError('');
      callback();
    });
  };

  let value = { user, error, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}