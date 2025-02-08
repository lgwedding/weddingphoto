import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../_config/firebase-config";
import { useRouter } from "next/navigation";

export const firebaseAuthService = () => {
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
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push(`/login`);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
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
