import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const register = async (
  username: string,
  email: string,
  password: string,
  role: string = "user",
) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred during registration");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred during login");
  }
};
