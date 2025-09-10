import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

function BackButton({ text = "Back", className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ArrowBack />
      {text}
    </button>
  );
}

export default BackButton;
