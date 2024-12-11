import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

export function initializeFirebase(): FirebaseApp {
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}
