import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonSmall from "./CustomButtonSmall";
import { useAuth } from "../hooks/AuthProvider";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      logout();
      navigate("/");
    }
  };

  return <CustomButtonSmall onClick={handleLogout}>Logout</CustomButtonSmall>;
}

export default LogoutButton;
