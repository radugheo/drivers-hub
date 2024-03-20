import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeString = async (
  key: string,
  value: string,
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
