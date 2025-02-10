import { useState } from "react";
import { register } from "../services/api/auth";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isRegisterFailedModalOpen, setIsRegisterFailedModalOpen] =
    useState(false);
  const [registerFailedMessage, setRegisterFailedMessage] = useState("");
  const [isRegisterSuccessModalOpen, setIsRegisterSuccessModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!username || !password || !repeatPassword) {
      setRegisterFailedMessage("Please enter all fields");
      setIsRegisterFailedModalOpen(true);
      return;
    }

    if (username.length > 25) {
      setRegisterFailedMessage("Username must be less than 25 characters");
      setIsRegisterFailedModalOpen(true);
      return;
    }

    if (password !== repeatPassword) {
      setRegisterFailedMessage("Passwords do not match!");
      setIsRegisterFailedModalOpen(true);
      return;
    }

    const passwordReg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordReg.test(password)) {
      setRegisterFailedMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      setIsRegisterFailedModalOpen(true);
      return;
    }

    try {
      await register(username, password);
      setIsRegisterSuccessModalOpen(true);
    } catch (error) {
      setRegisterFailedMessage(
        "Registration failed! " + (error.response?.data?.message || "")
      );
      setIsRegisterFailedModalOpen(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSuccessModalClose = () => {
    setIsRegisterSuccessModalOpen(false);
    navigate("/login");
  };

  return {
    states: {
      username,
      password,
      repeatPassword,
      showPassword,
      showRepeatPassword,
      isRegisterFailedModalOpen,
      registerFailedMessage,
      isRegisterSuccessModalOpen,
    },
    handlers: {
      setUsername,
      setPassword,
      setRepeatPassword,
      handleSubmit,
      togglePasswordVisibility,
      toggleRepeatPasswordVisibility,
      handleSuccessModalClose,
      setIsRegisterFailedModalOpen,
    },
  };
};

export default useRegister;
