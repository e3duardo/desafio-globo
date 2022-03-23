import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth, LoginCallback, LoginData } from "./services/auth";
import { UserType } from "./services/types";

interface AuthContextType {
  user: UserType | null;
  error: string;
  signin: ({ email, password }: LoginData, callback: LoginCallback) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

function defaultUser() {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user) || null;
  }

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<UserType | null>(defaultUser());
  let [error, setError] = useState<string>("");

  let signin = ({ email, password }: LoginData, callback: LoginCallback) => {
    return auth.signin({ email, password }, (user, error) => {
      setUser(user);
      setError(error);
      callback(user, error);
    });
  };

  let signout = (callback: VoidFunction) => {
    return auth.signout(() => {
      setUser(null);
      setError("");
      callback();
    });
  };

  let value = { user, error, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({
  children,
  backstage,
}: {
  children: JSX.Element;
  backstage?: boolean;
}) {
  let auth = useAuth();
  let location = useLocation();

  if (backstage && auth?.user?.role !== "backstage") {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
