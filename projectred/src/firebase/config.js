// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLjRtggYgQt7IKHLrlx8gnJnTi87rGVdA",
  authDomain: "sample-c07f9.firebaseapp.com",
  projectId: "sample-c07f9",
  storageBucket: "sample-c07f9.firebasestorage.app",
  messagingSenderId: "711415598109",
  appId: "1:711415598109:web:1042e597d4e9121e290af4",
  measurementId: "G-B0NKDPW3DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
