import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../_config/firebase-config";

export const firebaseAuthService = () => {
  const app = initializeApp(firebaseConfig);
  const authService = getAuth(app);

  //   const { setCurrent, currentUser } = useUserStore((state: any) => ({
  //     setCurrent: state.setCurrent,
  //     currentUser: state.currentUser,
  //   }));

  const login = ({ email, password }: { email: string; password: string }) => {
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // setCurrent(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const logut = () => {
    authService.signOut();
    console.log("logout");
    // setCurrent({});
  };

  const isLoggedin = (): boolean => {
    let loggedIn = false;
    if (authService.currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user

      loggedIn = true;
      // ...
    } else {
      // User is signed out
      // ...
      loggedIn = false;
    }
    return loggedIn;
  };

  return { login, logut, isLoggedin };
};
