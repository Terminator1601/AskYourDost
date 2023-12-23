




"use client"
// SignIn.tsx
import React, { useState } from 'react';
import { auth, db } from "@/database/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, collection, setDoc } from 'firebase/firestore';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLoginMode) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('Login successful!', userCredential);
      } else {
        const existingUser = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const userId = existingUser.user?.uid;

        const userDataRef = collection(db, 'userData');
        const userDocRef = doc(userDataRef, userId);

        await setDoc(userDocRef, {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        console.log('Registration successful!');
        window.alert('Registration successful!');
      }
    } catch (error: any) {
      console.error(`Error during ${isLoginMode ? 'login' : 'registration'}:`, error);
      window.alert(`Error during ${isLoginMode ? 'login' : 'registration'}: ${error.message}`);
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{isLoginMode ? 'Login' : 'Registration'} Form</h2>
      {!isLoginMode && (
        <>
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
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
        </>
      )}
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
          onClick={handleSubmit}
          className={`flex-1 ${
            isLoginMode ? 'bg-green-500' : 'bg-blue-500'
          } text-white px-4 py-2 rounded-md hover:${
            isLoginMode ? 'bg-green-600' : 'bg-blue-600'
          }`}
        >
          {isLoginMode ? 'Login' : 'Register'}
        </button>
      </div>
      <p className="mt-2">
        {isLoginMode ? 'New user? ' : 'Already have an account? '}
        <button onClick={toggleMode} className="text-blue-500 hover:underline focus:outline-none">
          {isLoginMode ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default SignIn;
