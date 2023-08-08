// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnYAkOlFynoAA2fb5Y4tsZQc0ThG99Cuk",
  authDomain: "telegram-app-2f7f4.firebaseapp.com",
  projectId: "telegram-app-2f7f4",
  storageBucket: "telegram-app-2f7f4.appspot.com",
  messagingSenderId: "274527841524",
  appId: "1:274527841524:web:885ca493f5bffb5a0802a1",
  measurementId: "G-W7C051HKGK",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, firebaseApp }; // Expo
