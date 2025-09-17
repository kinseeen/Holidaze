import { useState, useEffect } from "react";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "2cce9a49-627c-4905-b533-2c29345300a8";

export function useGet(endpoint) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2luZUFwaUtleSIsImVtYWlsIjoia2luZTEyM0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc1NTYzNTkxN30.OnAo8v5-70HeH8-JmNDoUzPmm79j5--3d3CcUr6Xk3s";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const result = await response.json();
        if (isMounted) {
          setResponse(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, JSON.stringify(headers)]);

  return { response, loading, error };
}

export function usePost(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (body = {}) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
}
