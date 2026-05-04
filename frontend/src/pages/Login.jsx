import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import sanitizeMessage from '../utils/sanitizeMessage';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Basic client-side validation
    if (!email || !password || (currentState === "Sign Up" && (!name || !phone || !confirm))) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (currentState === "Sign Up" && password !== confirm) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint =
        currentState === "Sign Up"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        currentState === "Sign Up"
          ? { name, email, password, phone }
          : { email, password };

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(
          currentState === "Sign Up"
            ? "Account created successfully!"
            : "Logged in successfully!"
        );
      } else {
        // For login, show a generic message to avoid exposing raw backend phrases
        if (currentState === 'Login') {
          toast.error('Invalid email or password');
        } else {
          toast.error(sanitizeMessage(response.data.message));
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-20 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/40 p-10 sm:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
              {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              {currentState === 'Login' ? 'Access your premium HF collection.' : 'Join our elite circle of design lovers.'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {currentState === "Sign Up" && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all duration-300 font-semibold text-gray-700 placeholder:text-gray-300"
                  required
                />
              </div>
            )}
            
            {currentState === "Sign Up" && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all duration-300 font-semibold text-gray-700 placeholder:text-gray-300"
                  required
                />
              </div>
            )}

            <div className="animate-in slide-in-from-top-2 duration-300 delay-75">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all duration-300 font-semibold text-gray-700 placeholder:text-gray-300"
                required
              />
            </div>

            <div className="animate-in slide-in-from-top-2 duration-300 delay-150">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all duration-300 font-semibold text-gray-700 placeholder:text-gray-300"
                required
              />
            </div>

            {currentState === "Sign Up" && (
              <div className="animate-in slide-in-from-top-2 duration-300 delay-200">
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all duration-300 font-semibold text-gray-700 placeholder:text-gray-300"
                  required
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-6 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 bg-gray-900 hover:bg-indigo-600 text-white font-black tracking-widest text-xs uppercase rounded-2xl shadow-xl transform transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing</span>
                  </div>
                ) : (
                  currentState === "Login" ? "Sign In" : "Register Account"
                )}
              </button>

              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")}
                  className="text-[10px] font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest transition-colors duration-300"
                >
                  {currentState === "Login" ? "New here? Create account" : "Already a member? Sign In"}
                </button>
                {currentState === "Login" && (
                  <button type="button" className="text-[10px] font-bold text-gray-300 hover:text-gray-600 uppercase tracking-widest transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-top-2 { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation-fill-mode: forwards; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-top-2 { animation-name: slide-in-from-top-2; }
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>
    </div>
  );
};

export default Login;