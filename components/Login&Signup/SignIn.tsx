import { getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../database/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, collection, setDoc } from "firebase/firestore";
import crypto from "crypto";
import { UserProvider } from "@/database/User/UserContext";
import { useUser } from "@/database/User/UserContext";


const SignIn: React.FC = () => {

  const { updateUser, /* other user data */ } = useUser();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    captcha: "",
    enteredCaptcha: "",
    status: "offline",
  });



  const generateCaptcha = () => {
    const captcha = crypto.randomBytes(3).toString("hex"); // Generate a n-character random string
    setFormData({ ...formData, captcha, enteredCaptcha: "" });
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha(); // Regenerate captcha when the button is clicked
  };

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setFormData((prevData) => ({ ...prevData, status: "online" })); // Update status to "online"
    updateUser({ ...formData});
  };

  const checkUniqueEmail = async (email: string) => {
    const emailQuery = query(
      collection(db, "userData"),
      where("email", "==", email)
    );
    const emailSnapshot = await getDocs(emailQuery);
    return emailSnapshot.empty;
  };

  const checkUniqueUsername = async (username: string) => {
    const usernameQuery = query(
      collection(db, "userData"),
      where("username", "==", username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);
    return usernameSnapshot.empty;
  };

  const handleSubmit = async () => {
    try {
      if (formData.captcha !== formData.enteredCaptcha) {
        throw new Error("Invalid captcha");
      }

      // Check for unique username and email (if applicable)
      if (!isLoginMode) {
        const isUniqueUsername = await checkUniqueUsername(formData.username);
        if (!isUniqueUsername) {
          throw new Error(
            "Username already exists. Please choose a different username or log in."
          );
        }

        const isUniqueEmail = await checkUniqueEmail(formData.email);
        if (!isUniqueEmail) {
          throw new Error("Email already exists. Please log in.");
        }
      }

      if (isLoginMode) {
        // Check if the user exists with the provided email
        const userQuery = query(
          collection(db, "userData"),
          where("email", "==", formData.email)
        );
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          throw new Error("Invalid email or password");
        }

        // Check if the password matches
        const userData = userSnapshot.docs[0].data();
        if (userData.password !== formData.password) {
          throw new Error("Invalid email or password");
        }

        console.log("Login successful!");
        window.alert("Login successful!");
        handleSuccessfulLogin();

        // Redirect to the home page after showing the popup
        // Replace the following line with the actual code to navigate to the home page
        // For example, you can use React Router: history.push("/home");
      } else {
        // Registration logic
        const existingUsername = await checkUniqueUsername(formData.username);
        const existingEmail = await checkUniqueEmail(formData.email);

        if (!existingUsername && !existingEmail) {
          throw new Error("Username and Email already exist. Please log in.");
        }

        const existingUser = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const userId = existingUser.user?.uid;

        const userDataRef = collection(db, "userData");
        const userDocRef = doc(userDataRef, userId);

        await setDoc(userDocRef, {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          status: "online", // Set the initial status to "online" during registration
        });

        console.log("Registration successful!");
        window.alert("Registration successful!");
      }
    } catch (error: any) {
      console.error(
        `Error during ${isLoginMode ? "login" : "registration"}:`,
        error
      );
      window.alert(
        `Error during ${isLoginMode ? "login" : "registration"}: ${
          error.message
        }`
      );
    } finally {
      generateCaptcha(); // Regenerate captcha after each attempt
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    generateCaptcha(); // Regenerate captcha when toggling mode
  };

  // Initial captcha generation when component mounts
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <UserProvider>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        {isLoggedIn ? (
          <>
            <p className="text-xl font-semibold mb-4">
              Welcome! You are logged in.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              // Add an onClick event to navigate to the home page or handle it according to your routing setup
            >
              Go to Home Page
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {isLoginMode ? "Login" : "Registration"} Form
            </h2>
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
            <label className="block mb-2">
              Captcha: {formData.captcha}
              <input
                type="text"
                name="enteredCaptcha"
                value={formData.enteredCaptcha}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-md"
              />
            </label>
            <div className="flex space-x-4">
              <button
                onClick={handleSubmit}
                className={`flex-1 ${
                  isLoginMode ? "bg-green-500" : "bg-blue-500"
                } text-white px-4 py-2 rounded-md hover:${
                  isLoginMode ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {isLoginMode ? "Login" : "Register"}
              </button>
              <button
                onClick={handleRefreshCaptcha}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Refresh Captcha
              </button>
            </div>
            <p className="mt-2">
              {isLoginMode ? "New user? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                {isLoginMode ? "Register here" : "Login here"}
              </button>
            </p>
          </>
        )}
      </div>
    </UserProvider>
  );
};

export default SignIn;
