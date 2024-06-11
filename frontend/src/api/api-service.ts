import axios from "axios";
import { Car } from "../models/Car.model";
import { retrieveString } from "../utils/storage-handler";
import { ActiveInsurance } from "../models/Active-Insurance.model";
import { Buffer } from "buffer";

// const BASE_URL = process.env.BACKEND_URL;
// const BASE_URL = "http://drivershub.us-east-1.elasticbeanstalk.com";
const BASE_URL = "http://192.168.100.33:3000";

export const registerApiCall = async (
  username: string,
  email: string,
  password: string,
  role: string = "user",
) => {
  try {
    console.log("BASE_URL", BASE_URL);
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

export const updateUserDataApiCall = async (
  userData: any,
  id: number,
  token: string,
) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while updating user data");
  }
};

export const updateUserPasswordApiCall = async (
  email: string,
  newPassword: string,
  token: string,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updatePassword`,
      { email, password: newPassword },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `An error occurred while updating password: ${JSON.stringify(error)}`,
    );
    throw new Error("Failed to update password");
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

export const updateInspectionApiCall = async (
  inspection: any,
  token: string,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/inspection/active/${inspection.id}`,
      inspection,
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
      : new Error("An error occurred while updating inspection");
  }
};

export const deleteInspectionApiCall = async (
  inspectionId: number,
  token: string,
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/inspection/active/${inspectionId}`,
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
      : new Error("An error occurred while deleting inspection");
  }
};

export const updateServiceApiCall = async (service: any, token: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/service/active/${service.id}`,
      service,
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
      : new Error("An error occurred while updating service");
  }
};

export const deleteServiceApiCall = async (
  serviceId: number,
  token: string,
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/service/active/${serviceId}`,
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
      : new Error("An error occurred while deleting service");
  }
};

export const getEstimatedCarPriceApiCall = async (
  id: number,
  token: string,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/cars/${id}/predict`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.price;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred while getting price prediction");
  }
};
export const updatePushTokenApiCall = async (
  userId: number,
  pushToken: string,
  token: string,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/${userId}/updatePushToken`,
      {
        pushToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error(
          `An error occurred while updating push token: ${JSON.stringify(error)}`,
        );
  }
};

export const getPushTokenApiCall = async (userId: number, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/pushToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching push token");
  }
};

export const getSymbolsDataApiCall = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/predict-dashboard-symbols`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching symbols");
  }
};

export const getSymbolsImageApiCall = async (imageUrl: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${imageUrl}`, {
      responseType: "arraybuffer",
    });
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching symbols image");
  }
};
