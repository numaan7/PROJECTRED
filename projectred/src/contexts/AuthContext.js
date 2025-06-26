import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Create initial user document with basic info from Google
          const initialUserData = {
            email: user.email,
            name: user.displayName || '',
            photoURL: user.photoURL || '',
            phone: '',
            city: '',
            state: '',
            pincode: '',
            bloodGroup: '',
            isPublic: false,
            consentGiven: false,
            lastDonation: null,
            eligibleToDonate: true,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          await setDoc(doc(db, 'users', user.uid), initialUserData);
          setUserData(initialUserData);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserData = async (newData) => {
    if (user) {
      try {
        const updatedData = {
          ...userData,
          ...newData,
          updatedAt: new Date()
        };
        
        // Use setDoc with merge option to handle both create and update
        await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });
        setUserData(updatedData);
      } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
      }
    }
  };

  const value = {
    user,
    userData,
    loading,
    signInWithGoogle,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
