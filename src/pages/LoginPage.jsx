import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null); // User profile state

  // Google login hook
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // Fetch user profile data once the login is successful
      fetchUserProfile(codeResponse.access_token);
    },
    onError: (error) => {
      console.log("Login Failed:", error); // Log error if login fails
    },
  });

  const fetchUserProfile = async (accessToken) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      setProfile(res.data); // Set profile data
      console.log("User Profile:", res.data); // Log user profile data
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      console.error(err); // Log error if fetching profile fails
    }
  };

  // Logout function
  const logOut = () => {
    googleLogout(); // Call Google logout function
    setProfile(null); // Clear profile data
  };

  return (
    <div className="min-h-screen bg-[#d1e5e4] flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-[#d1e5e4] rounded-full"></div>
              <span className="text-2xl font-bold text-purple-600">
                MindSpace
              </span>
            </div>
          </Link>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Use your Google account to sign in or create a new account.
        </p>
        {!profile ? ( // Check if profile is null to determine whether to show login or profile
          <button
            onClick={() => login()}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg"
          >
            Sign in with Google 🚀
          </button>
        ) : (
          <div className="text-center">
            <img
              src={profile.picture}
              alt="User"
              className="rounded-full mb-4"
            />
            <h3>User Logged In</h3>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <button
              onClick={logOut}
              className="mt-4 bg-red-500 text-white font-semibold py-2 rounded-lg"
            >
              Log out
            </button>
          </div>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-purple-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-purple-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
