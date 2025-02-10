import { useState } from "react";
import { login } from "../services/api/auth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginFailedModalOpen, setIsLoginFailedModalOpen] = useState(false);
    const [loginFailedMessage, setLoginFailedMessage] = useState("");
    const [isLoginSuccessModalOpen, setIsLoginSuccessModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await login(username, password);
        if (response.data.success) {
          localStorage.setItem("user", JSON.stringify({ username }));
          setIsLoginSuccessModalOpen(true);
        } else {
          setIsLoginFailedModalOpen(true);
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginFailedMessage(error);
        setIsLoginFailedModalOpen(true);
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSuccessModalClose = () => {
      setIsLoginSuccessModalOpen(false);
      navigate("/", { replace: true });
    };

    return{
        states: {
            username,
            password,
            isLoginFailedModalOpen,
            loginFailedMessage,
            isLoginSuccessModalOpen,
            showPassword
        },
        handlers: {
            setUsername,
            setPassword,
            setIsLoginFailedModalOpen,
            handleSubmit,
            togglePasswordVisibility,
            handleSuccessModalClose
        }
    }
}

export default useLogin;