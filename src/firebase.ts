import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6TDwjD7Jew5KheRyBBiARzkLsrNH8pQs",
  authDomain: "it-s-c9194.firebaseapp.com",
  projectId: "it-s-c9194",
  storageBucket: "it-s-c9194.appspot.com",
  messagingSenderId: "971405342487",
  appId: "1:971405342487:web:f89ddfb1aa06883f242952",
  measurementId: "G-S7HNLM7BFM",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
