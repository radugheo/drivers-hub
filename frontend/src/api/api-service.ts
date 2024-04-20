import axios from "axios";
import { Car } from "../models/Car.model";
import { retrieveString } from "../utils/storage-handler";
import { ActiveInsurance } from "../models/Active-Insurance.model";

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
    console.log(JSON.stringify(error));
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
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred during login");
  }
};

export const getUserDataApiCall = async (token: string) => {
  try {
    const userId = await retrieveString("userId");
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching user data");
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
    response.data.sort((a: Car, b: Car) => {
      if (a.make < b.make) return -1;
      if (a.make > b.make) return 1;
      if (a.model < b.model) return -1;
      if (a.model > b.model) return 1;
      return 0;
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

export const updateCarApiCall = async (car: any, token: string) => {
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

export const addInsuranceApiCall = async (
  insurance: ActiveInsurance,
  token: string,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/insurance/active`,
      insurance,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while adding insurance");
  }
};

export const updateInsuranceApiCall = async (
  insurance: ActiveInsurance,
  token: string,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/insurance/active/${insurance.id}`,
      insurance,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while updating insurance");
  }
};

export const deleteInsuranceApiCall = async (
  insuranceId: number,
  token: string,
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/insurance/active/${insuranceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while deleting insurance");
  }
};
