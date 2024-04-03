import axios from "axios";
import { Car } from "../models/Car.model";
import { retrieveString } from "../utils/storage-handler";

const BASE_URL = process.env.BACKEND_URL;

export const registerApiCall = async (
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

export const loginApiCall = async (email: string, password: string) => {
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

export const getCarsApiCall = async (token: string) => {
  try {
    const ownerId = await retrieveString("userId");
    const response = await axios.get(`${BASE_URL}/cars/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching cars");
  }
};

export const addCarApiCall = async (car: Car, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/cars`, car, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while adding a car");
  }
};

export const updateCarApiCall = async (car: Car, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/cars/${car.id}`, car, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while updating the car");
  }
};

export const deleteCarApiCall = async (carId: number, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cars/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while deleting the car");
  }
};
