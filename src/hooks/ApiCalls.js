import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "2cce9a49-627c-4905-b533-2c29345300a8";

export function useGet(endpoint) {
  const [response, setResponse] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = user?.token;

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
  const { user } = useAuth(); // get token from auth
  const token = user?.token;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const token = user?.token;

  const post = async (body = {}) => {
    if (!token) throw new Error("User is not logged in");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
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
