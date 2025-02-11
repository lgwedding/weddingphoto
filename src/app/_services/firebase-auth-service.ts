import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../_config/firebase-config";
import { useRouter } from "next/navigation";

export const useFirebaseAuthService = () => {
  const app = initializeApp(firebaseConfig);
  const authService = getAuth(app);
  const router = useRouter();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
      const user = userCredential.user;

      document.cookie = `auth_token=${await user.getIdToken()};path=/`;

      router.push(`/dashboard`);
      return { success: true, user };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
      return {
        success: false,
        error: "An unknown error occurred",
      };
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push(`/`);
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
      return {
        success: false,
        error: "An unknown error occurred",
      };
    }
  };

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        authService,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  };

  return { login, logout, getCurrentUser };
};
