import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export interface AuthUser {
  name: string;
  email: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  signup: (
    name: string,
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "motoverse_users";
const AUTH_USER_KEY = "motoverse_auth_user";

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadCurrentUser());

  const login = useCallback((email: string, password: string) => {
    const users = loadUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!found) {
      return {
        success: false,
        error: "Invalid email or password. Please check your credentials.",
      };
    }
    const authUser: AuthUser = { name: found.name, email: found.email };
    setUser(authUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    return { success: true };
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string) => {
      const users = loadUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (exists) {
        return {
          success: false,
          error: "This email is already registered. Please sign in instead.",
        };
      }
      const newUser: StoredUser = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
      };
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      const authUser: AuthUser = { name: newUser.name, email: newUser.email };
      setUser(authUser);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
