import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDTZ77r42XbO7gbBjMQdPk00aLa16-9oU",
  authDomain: "twitter-clone-f79f0.firebaseapp.com",
  projectId: "twitter-clone-f79f0",
  storageBucket: "twitter-clone-f79f0.appspot.com",
  messagingSenderId: "705878261175",
  appId: "1:705878261175:web:20a1d7bf3dd374dcbbfc32",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
