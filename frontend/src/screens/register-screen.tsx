import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { register } from "../api/auth-service";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please ensure the passwords match before proceeding.",
      );
      return;
    }
    try {
      const data = await register(username, email, password, "user");
      console.log("Registration successful", data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.registerText}>Register</Text>
        <Pressable
          onPress={() => navigation.navigate("Login" as never)}
          style={styles.redirectButton}
        >
          <Text style={styles.redirectButtonText}>
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user-secret" size={24} color="black" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={24} color="black" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={24} color="black" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={24} color="black" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.buttonDesign} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  redirectButton: {
    marginTop: 10,
  },
  redirectButtonText: {
    fontSize: 16,
    color: "blue",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 24,
  },
  registerText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
  },
  input: {
    height: 20,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonDesign: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});

export default RegisterScreen;
