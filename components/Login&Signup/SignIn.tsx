import { getDocs, query, where, collection } from "firebase/firestore";
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

      if (userSnapshot.empty) {
        throw new Error("Email not registered. Please register.");
      }

      // Check if the password matches
      const userData = userSnapshot.docs[0].data() as UserData;
      if (userData.password !== formData.password) {
        throw new Error("Invalid password");
      }

      console.log("Login successful!");
      window.alert(`Welcome ${userData.username}! Login successful!`);
      handleSuccessfulLogin(userData);
    } catch (error: any) {
      console.error(`Error during login:`, error);
      window.alert(`Error during login: ${error.message}`);
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
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        {isLoggedIn ? (
          <>
            <p className="text-xl font-semibold mb-4">
              Welcome {username}! You are logged in.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Go to Home Page
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {isLoginMode ? "Login" : "Registration"} Form
            </h2>
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
