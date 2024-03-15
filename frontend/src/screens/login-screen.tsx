import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import { login } from "../api/auth-service";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log("Login successful", data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.loginText}>Login</Text>
        <Pressable
          onPress={() => navigation.navigate("Register" as never)}
          style={styles.redirectButton}
        >
          <Text style={styles.redirectButtonText}>
            New in the area? Sign up here
          </Text>
        </Pressable>
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
      <Pressable style={styles.buttonDesign} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
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
  loginText: {
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

export default LoginScreen;
