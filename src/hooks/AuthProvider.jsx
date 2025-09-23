import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "2cce9a49-627c-4905-b533-2c29345300a8";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const API_KEY = "2cce9a49-627c-4905-b533-2c29345300a8";

  const login = async (credentials) => {
    console.log("Logging in with credentials:", credentials);
    try {
      const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(credentials),
      });

      const loginJson = await loginRes.json();
      console.log("Login response:", loginJson);

      if (!loginRes.ok)
        throw new Error(loginJson?.errors?.[0]?.message || "Login failed");

      const { data } = loginJson;

      const profileRes = await fetch(
        `${API_BASE_URL}/holidaze/profiles/${data.name}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            "X-Noroff-API-Key": API_KEY,
          },
        }
      );

      const profileJson = await profileRes.json();
      console.log("Profile response:", profileJson);

      if (!profileRes.ok)
        throw new Error(
          profileJson?.errors?.[0]?.message || "Profile fetch failed"
        );

      const userData = {
        token: data.accessToken,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        venueManager: profileJson.data?.venueManager || false,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Final userData:", userData);
      return userData;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
