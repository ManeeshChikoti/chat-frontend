
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCyhQirW-HPjfV4SYRWE7zqrUwPwCM5a4",
  authDomain: "let-s-chat-a1554.firebaseapp.com",
  projectId: "let-s-chat-a1554",
  storageBucket: "let-s-chat-a1554.appspot.com",
  messagingSenderId: "186028539254",
  appId: "1:186028539254:web:cf1a8efde5a290f397ce57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);