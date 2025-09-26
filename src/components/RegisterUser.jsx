import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          bio: formData.bio || undefined,
          avatar: formData.avatarUrl
            ? { url: formData.avatarUrl, alt: formData.avatarAlt || "" }
            : undefined,
          banner: formData.bannerUrl
            ? { url: formData.bannerUrl, alt: formData.bannerAlt || "" }
            : undefined,
          venueManager: formData.venueManager,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.errors?.[0]?.message || "Registration failed");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email (must end with @stud.noroff.no)"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="bio"
          placeholder="Bio (optional)"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="avatarUrl"
          type="url"
          placeholder="Avatar URL (optional)"
          value={formData.avatarUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="avatarAlt"
          type="text"
          placeholder="Avatar Alt text"
          value={formData.avatarAlt}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            name="venueManager"
            type="checkbox"
            checked={formData.venueManager}
            onChange={handleChange}
          />
          Register as Venue Manager
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default RegisterUser;
