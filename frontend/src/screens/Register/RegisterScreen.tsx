import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { loginApiCall, registerApiCall } from "../../api/api-service";
import { useNavigation } from "@react-navigation/native";
import PageTitle from "../../components/PageTitle/PageTitle";
import RedirectButton from "../../components/RedirectButton/RedirectButton";
import Logo from "../../components/Logo/Logo";
import { styles } from "./RegisterScreen.styles";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import { storeString } from "../../utils/storage-handler";
import FormAuthField from "../../components/FormAuthField/FormAuthField";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "username":
        if (value.length < 6) {
          error = "Username must be at least 6 characters long.";
        }
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "password":
        if (
          value.length < 8 ||
          !/[A-Z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[!@#$%^&*]/.test(value)
        ) {
          error =
            "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character (!@#$%^&*).";
        }
        break;
      case "confirmPassword":
        if (password !== value) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleInputChange = (field: any, value: any) => {
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    validateField(field, value);
  };

  const handleRegister = async () => {
    if (Object.values(errors).some((error) => error !== "")) {
      Alert.alert("Invalid input", "Please check the form for errors.");
      return;
    }

    try {
      await registerApiCall(username, email, password, "user");
      const data = await loginApiCall(email, password);
      await storeString("userToken", data.token);
      await storeString("userId", data.id.toString());
      console.log("Registration successful", data);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never }],
      });
    } catch (error: any) {
      console.error("Registration failed", error);
      Alert.alert("Registration failed", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Logo />
          <PageTitle title="Register" />
          <RedirectButton
            title="Already have an account? Login"
            onPress={() => navigation.navigate("Login" as never)}
          />
          <FormAuthField
            iconName="user-secret"
            placeholder="Username"
            value={username}
            onChangeText={(value) => handleInputChange("username", value)}
          />
          {errors.username ? (
            <Text style={styles.errorText}>{errors.username}</Text>
          ) : null}
          <FormAuthField
            iconName="envelope"
            placeholder="Email"
            value={email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          <FormAuthField
            iconName="lock"
            placeholder="Password"
            value={password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          <FormAuthField
            iconName="lock"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
            secureTextEntry
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
          <OpacityButton title="REGISTER" onPress={handleRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
