import { API_BASE_URL } from "../config";

const getToken = () => localStorage.getItem("authToken");
const saveToken = (token) => localStorage.setItem("authToken", token);
const clearToken = () => localStorage.removeItem("authToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const saveRefreshToken = (refreshToken) =>
  localStorage.setItem("refreshToken", refreshToken);

const isLoggedIn = () => !!getToken();

const registerUser = async (firstName, phone, email, password) => {
  const response = await fetch(`${API_BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, phone, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed.");
  }

  const data = await response.json();
  return data;
};

const doLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed.");
    }

    const data = await response.json();
    saveToken(data.token);
    saveRefreshToken(data.refreshToken);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error.message || "Login failed.");
  }
};

const doLogout = () => {
  clearToken();
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

const updateToken = async (successCallback) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No token found.");
    }

    const isTokenValid = true;

    if (!isTokenValid) {
      throw new Error("Token is invalid or expired.");
    }

    if (successCallback) {
      successCallback(token);
    }

    return token;
  } catch (error) {
    console.error("Token update failed:", error);
    doLogout();
  }
};

export const AuthService = {
  clearToken,
  doLogin,
  registerUser,
  doLogout,
  isLoggedIn,
  getRefreshToken,
  getToken,
  updateToken,
};
