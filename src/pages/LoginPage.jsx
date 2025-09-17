import React, { useState } from "react";
import { useNavigate } from "react-router";
import CustomButtonSmall from "../components/CustomButtonSmall";
import { usePost } from "../hooks/ApiCalls";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { response, loading, error, post } = usePost("/auth/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await post({ email, password });

      const user = result.data;

      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("profileName", user.name);

      navigate(`/profile/${user.name}`);
    } catch (err) {
      console.error("login failed", err);
    }
  };
  /* 
     const { data, loading, error } = post("/auth/login");
     requestBody={"email": "first.last@stud.noroff.no","password": "UzI1NiIsInR5cCI"}

     1. create POST function (so that you actually can log in)
     2. when the loign is successful 
          a. add accessToken to local storage
          b. go to profile page (fetch name from accessToken) NOTE: jwt.io to debug token
  */
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Log in or create an account
        </h1>

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 rounded-lg border border-primary px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 rounded-lg border border-primary px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <CustomButtonSmall
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </CustomButtonSmall>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-black-100 text-center"> or </p>
        <p
          className="text-blue-600 text-center cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
