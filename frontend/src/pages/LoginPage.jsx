import React from "react";
import PromptModal from "../components/Modals/PromptModal.jsx";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { states, handlers } = useLogin();

  const {
    username,
    password,
    isLoginFailedModalOpen,
    loginFailedMessage,
    isLoginSuccessModalOpen,
    showPassword,
  } = states;

  const {
    setUsername,
    setPassword,
    setIsLoginFailedModalOpen,
    handleSubmit,
    togglePasswordVisibility,
    handleSuccessModalClose,
  } = handlers;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-600 to-slate-700">
      <Fade>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-12 rounded shadow-lg w-100"
        >
          <h2 className="text-2xl font-[600] mb-6 text-center">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-2 py-2 text-gray-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white p-2 rounded cursor-pointer hover:bg-slate-600 transition-colors duration-500"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-slate-700 cursor-pointer">
              Register
            </Link>
          </p>
        </form>
      </Fade>
      <PromptModal
        isOpen={isLoginFailedModalOpen}
        onClose={() => setIsLoginFailedModalOpen(false)}
        title="Login Failed"
        text={`${loginFailedMessage}`}
      />
      <PromptModal
        isOpen={isLoginSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Login Successful"
        text="Login successful! Redirecting to home page."
      />
    </div>
  );
};

export default LoginPage;
