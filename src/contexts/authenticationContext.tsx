"use client";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { initializeFirebase } from "@/lib/firebase/firebaseApp";
import { LocalStorageUtils } from "@/lib/utils/localStorageUtils";
import { getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthenticationProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  login?: () => Promise<UserCredential>;
  logout?: () => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationProps>({
  isAuthenticated: false,
  isLoading: true,
  user: undefined,
});

initializeFirebase();
const app = getApp();
const auth = getAuth(app);

interface ProviderProps {
  children?: React.ReactNode;
}

const AuthenticationProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        setUser(user);
        setAuthenticated(true);
        LocalStorageUtils.importUserData(user);
        if (pathname === AppRoutes.INDEX) router.push(AppRoutes.HOME);
      } else {
        LocalStorageUtils.clearUserData();
        setUser(undefined);
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, [pathname, router]);

  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    const data = await signInWithPopup(auth, provider);
    router.push(AppRoutes.HOME);
    return data;
  }, [router]);

  const logout = useCallback(async () => {
    setUser(undefined);
    setAuthenticated(false);
    await signOut(auth);
    router.push(AppRoutes.INDEX);
  }, [router]);

  const authenticationProviderValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      login,
      logout,
    }),
    [isAuthenticated, isLoading, login, logout, user]
  );

  return (
    <AuthenticationContext.Provider value={authenticationProviderValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuthentication };
