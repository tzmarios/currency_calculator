import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { removeAuthToken, getAuthToken } from "../services/utils/tokenManager";
import { isUserLoggedIn } from "../services/utils/userState";
import PromptModal from "./Modals/PromptModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [isLoggedOutModalOpen, setIsLoggedOutModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    setUsername("");
    setIsLoggedOutModalOpen(true);
  };

  const handleLoggedOutModalClose = () => {
    setIsLoggedOutModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, [isUserLoggedIn()]);

  return (
    <nav className="bg-gradient-to-tr from-slate-800 to-slate-900 p-6 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-stone-100 font-bold text-2xl hover:text-blue-300 transition duration-300"
        >
          Currency Calculator
        </Link>
        <div className="md:hidden">
          <button onClick={toggleNavbar} className="cursor-pointer">
            {isOpen ? (
              <FaTimes className="text-white text-2xl" />
            ) : (
              <FaBars className="text-white text-2xl" />
            )}
          </button>
        </div>
        <div className="hidden md:flex md:items-center">
          <Link
            to="/configuration"
            className="text-stone-100 font-bold text-xl hover:text-blue-300 transition duration-300 ml-6"
          >
            Configuration
          </Link>
          {isLoggedIn ? (
            <>
              <span className="text-stone-100 font-semibold text-lg italic ml-20">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ml-10 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 ml-6 cursor-pointer"
            >
              Login/Register
            </Link>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden p-4 bg-gradient-to-tr from-slate-800 to-slate-900">
          <ul>
            <li className="py-2">
              <Link
                to="/configuration"
                className="block text-white font-bold text-xl hover:text-blue-300 transition duration-300 cursor-pointer"
                onClick={toggleNavbar}
              >
                Configuration
              </Link>
            </li>
            <li className="py-2">
              {isLoggedIn ? (
                <>
                  <span className="block text-white font-semibold text-lg mt-4 mb-4">
                    {username}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleNavbar();
                    }}
                    className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
                  onClick={toggleNavbar}
                >
                  Login/Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
      <PromptModal
        isOpen={isLoggedOutModalOpen}
        onClose={handleLoggedOutModalClose}
        title="Logged Out Successfully"
        text="You logged out successfully. You are now redirected to the home page."
        className="bg-gradient-to-tr from-slate-800 to-slate-900 z-50"
      />
    </nav>
  );
};

export default Navbar;
