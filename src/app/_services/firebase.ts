import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../_config/firebase-config";
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
