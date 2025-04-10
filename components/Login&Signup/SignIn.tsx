

import { getDocs, addDoc, query, where, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../database/firebaseConfig";
import crypto from "crypto";
import Cookies from "universal-cookie";
import { UserProvider } from "@/database/User/UserContext";
import { useUser } from "@/database/User/UserContext";

type UserData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  captcha: string;
  enteredCaptcha: string;
  status: string;
};

const SignIn: React.FC = () => {
  const { updateUser /* other user data */ } = useUser();

  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    captcha: "",
    enteredCaptcha: "",
    status: "offline",
  });

  const generateCaptcha = () => {
    const captcha = crypto.randomBytes(3).toString("hex");
    setFormData({ ...formData, captcha, enteredCaptcha: "" });
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
  };

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const cookies = new Cookies(); // Create a cookies instance

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccessfulLogin = (userData: UserData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);

    // Set cookies after successful login
    cookies.set("username", userData.username, { path: "/" });
    cookies.set("email", userData.email, { path: "/" });

    setFormData((prevData) => ({ ...prevData, status: "online" }));
    updateUser({ ...formData });
  };

  const handleSubmit = async () => {
    try {
      if (formData.captcha !== formData.enteredCaptcha) {
        throw new Error("Invalid captcha");
      }

      // Check if the user exists with the provided email
      const userQuery = query(
        collection(db, "userData"),
        where("email", "==", formData.email)
      );
      const userSnapshot = await getDocs(userQuery);

      // Registration logic
      if (!isLoginMode) {
        if (userSnapshot.docs.length > 0) {
          throw new Error("Email already registered. Please log in.");
        }

        const newUser = {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          status: "online",
        };

        // Add the new user to the database
        await addDoc(collection(db, "userData"), newUser);

        console.log("Registration successful!");
        window.alert(`Registration successful! Please log in.`);
        toggleMode(); // Switch to the login mode after successful registration
      } else {
        // Login logic
        if (userSnapshot.empty) {
          throw new Error("Email not registered. Please register.");
        }

        const userData = userSnapshot.docs[0].data() as UserData;
        if (userData.password !== formData.password) {
          throw new Error("Invalid password");
        }

        console.log("Login successful!");
        window.alert(`Welcome ${userData.username}! Login successful!`);
        handleSuccessfulLogin(userData);
      }
    } catch (error: any) {
      console.error(`Error during login/registration:`, error);
      window.alert(`Error during login/registration: ${error.message}`);
      if (error.message === "Email not registered. Please register.") {
        setIsLoginMode(false);
      }
    } finally {
      generateCaptcha();
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    generateCaptcha();
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <UserProvider>
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
        {isLoggedIn ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-6 text-gray-800">
              Welcome <span className="text-[#e3a62f]">{username}</span>!
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-[#0cc0df] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0ab0cf] transition-colors duration-200"
            >
              Go to Home Page
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {isLoginMode ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLoginMode ? "Sign in to continue" : "Join our community"}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              {!isLoginMode && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#5c941d] focus:border-transparent"
                      placeholder="Choose a username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#5c941d] focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#e3a62f] focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Captcha</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    name="enteredCaptcha"
                    value={formData.enteredCaptcha}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent"
                    placeholder="Enter captcha"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-lg font-medium bg-gray-100 px-3 py-2 rounded">
                      {formData.captcha}
                    </span>
                    <button
                      onClick={handleRefreshCaptcha}
                      className="p-2 text-gray-500 hover:text-[#0cc0df]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                  isLoginMode 
                    ? "bg-[#5c941d] hover:bg-[#528a1a]" 
                    : "bg-[#0cc0df] hover:bg-[#0ab0cf]"
                }`}
              >
                {isLoginMode ? "Sign In" : "Create Account"}
              </button>
              <p className="text-center text-gray-600">
                {isLoginMode ? "New to AskYourDost? " : "Already have an account? "}
                <button
                  onClick={toggleMode}
                  className="text-[#0cc0df] hover:text-[#0ab0cf] font-medium"
                >
                  {isLoginMode ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </UserProvider>
  );
};

export default SignIn;
