/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { AuthService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../shared/loader";
import { DataContext } from "../../context/DataContext";
import {jwtDecode} from "jwt-decode";
const SignIn = () => {
  const { registerUser, doLogin } = AuthService;
  const {setUser} = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePhoneNumber = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (isSignUp && !validatePhoneNumber(phone)) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
       const data = await registerUser(name, phone, email, password);
       console.log(data);
       setSignUpSuccess(true);
        toast.success("Account created successfully!");

        setTimeout(() => {
          setSignUpSuccess(false);
          setIsSignUp(false);
        }, 2000);
      } else {
      const data = await doLogin(email, password);
        localStorage.setItem("token", data?.token);
      toast.success("Logged in successfully!");
        const response = await fetch("https://api.leosteph.com/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,// Ensure token is correctly passed
          },
        });
        const request = await response.json();
        setUser(request.user);
        localStorage.setItem("user", JSON.stringify(request.user));
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setError("");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white px-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100"></div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-midnightBlue p-8 rounded-lg shadow-lg w-full  md:w-1/2 max-w-md font-Roobert changeFontSpacing"
      >
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {signUpSuccess && !isSignUp && (
          <p className="text-emerald-400 mb-4">
            Sign-up successful! Please sign in.
          </p>
        )}
        {isSignUp && (
          <>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-4 bg-transparent border border-white rounded-md text-emerald-100 placeholder-emerald-500 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2 text-white"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-4 bg-transparent border border-white rounded-md text-emerald-100 placeholder-emerald-500 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                required
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
             className="block text-sm font-medium mb-2 text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-4 bg-transparent border border-white rounded-md text-emerald-100 placeholder-emerald-500 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2 text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             className="w-full px-3 py-4 bg-transparent border border-white rounded-md text-emerald-100 placeholder-emerald-500 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-limeGreen text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300 relative overflow-hidden"
            disabled={loading}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            )}
            <span className={loading ? "opacity-0" : "opacity-100"}>
              {isSignUp ? (loading ? "Registering..." : "Sign Up") : "Sign In"}
            </span>
          </button>
        </div>
        <div className="text-center mt-4">
          {isSignUp ? (
            <p className="text-white">
              Already have an account?
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-limeGreen font-semibold hover:underline ml-2 focus:outline-none"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p className="text-white">
              Don't have an account?
              <button
                type="button"
                onClick={handleSignUpClick}
                className="text-limeGreen font-semibold hover:underline ml-2 focus:outline-none"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
