
"use client"


// SignIn.tsx
import React, { useState } from 'react';
import { auth, db } from "@/database/firebaseConfig";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  // Update form data on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle user registration
  const handleRegister = async () => {
    try {
      // Check if email is already in use
      const existingUser = await fetchSignInMethodsForEmail(auth, formData.email);
      if (existingUser.length > 0) {
        // Display a popup or alert
        window.alert('Email is already in use. Please use a different email or log in.');
        return;
      }

      // Continue with user registration
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user?.uid;

      // Add user details to Firestore in the 'userData' collection
      const userDataRef = collection(db, 'userData');
      const userDocRef = doc(userDataRef, userId);

      await setDoc(userDocRef, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        // You might want to avoid storing passwords in plain text for security reasons
        password: formData.password,
      });

      // Log success and display a popup
      console.log('Registration successful!');
      window.alert('Registration successful!');
    } catch (error: any) {
      // Log the error and display a popup with the error message
      console.error('Error during registration:', error);
      window.alert(`Error during registration: ${error.message}`);
    }
  };

  // Handle user login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Login successful!', userCredential);
      // Optionally, you can redirect to the dashboard or home page
      // Example: history.push('/dashboard');
    } catch (error: any) {
      console.error('Error during login:', error);
      window.alert(`Error during login: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registration & Login Form</h2>
      <label className="block mb-2">
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <label className="block mb-2">
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <label className="block mb-2">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <div className="flex space-x-4">
        <button
          onClick={handleRegister}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
        <button
          onClick={handleLogin}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
