import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBq-LYzwQX4IRVG5ObwwHkPjrp4uKRNtk",
  authDomain: "cartsy-dad4a.firebaseapp.com",
  projectId: "cartsy-dad4a",
  storageBucket: "cartsy-dad4a.firebasestorage.app",
  messagingSenderId: "758809796383",
  appId: "1:758809796383:web:c13ca7445ad62c8cf75a2a",
  measurementId: "G-1PXTB2QK0R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();