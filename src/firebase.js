// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_EtMz_Eo6jMdXzDqpRXWkT7EbpLD1Glo",
  authDomain: "form-editor-9268c.firebaseapp.com",
  projectId: "form-editor-9268c",
  storageBucket: "form-editor-9268c.firebasestorage.app",
  messagingSenderId: "663902749271",
  appId: "1:663902749271:web:b6a1632ccfdbd4f37e5912",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
