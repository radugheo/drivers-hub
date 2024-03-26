import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "USER_AUTH_TOKEN";
const EXPIRATION_KEY = "TOKEN_EXPIRATION";

export const saveAuthToken = async (token: string): Promise<void> => {
  const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  try {
    await SecureStore.setItem(TOKEN_KEY, token);
    await SecureStore.setItem(
      EXPIRATION_KEY,
      expirationDate.toISOString()
    );
  } catch (error) {
    console.error("Error saving the auth token:", error);
  }
};

export const storeString = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const retrieveString = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const removeString = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
