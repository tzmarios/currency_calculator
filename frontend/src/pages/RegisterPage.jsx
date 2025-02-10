import React from "react";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";
import PromptModal from "../components/Modals/PromptModal";
import { Fade } from "react-awesome-reveal";

const RegisterPage = () => {
  const { states, handlers } = useRegister();

  const {
    username,
    password,
    repeatPassword,
    showPassword,
    showRepeatPassword,
    isRegisterFailedModalOpen,
    registerFailedMessage,
    isRegisterSuccessModalOpen,
  } = states;

  const {
    setUsername,
    setPassword,
    setRepeatPassword,
    handleSubmit,
    togglePasswordVisibility,
    toggleRepeatPasswordVisibility,
    handleSuccessModalClose,
    setIsRegisterFailedModalOpen,
  } = handlers;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-600 to-slate-700">
      <Fade>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-12 rounded shadow-lg w-100"
        >
          <h2 className="text-2xl font-[600] mb-6 text-center">Register</h2>
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
          <div className="relative w-full mb-4">
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={toggleRepeatPasswordVisibility}
              className="absolute inset-y-0 right-0 px-2 py-2 text-gray-600 cursor-pointer"
            >
              {showRepeatPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white p-2 rounded cursor-pointer"
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-700 cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </Fade>
      <Fade>
        <PromptModal
          isOpen={isRegisterFailedModalOpen}
          onClose={() => setIsRegisterFailedModalOpen(false)}
          title="Registration Failed"
          text={registerFailedMessage}
        />
      </Fade>
      <Fade>
        <PromptModal
          isOpen={isRegisterSuccessModalOpen}
          onClose={handleSuccessModalClose}
          title="Registration Successful"
          text="Registration successful! You can now log in."
        />
      </Fade>
    </div>
  );
};

export default RegisterPage;
