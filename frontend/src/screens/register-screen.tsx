import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { register } from "../api/auth-service";
import { useNavigation } from "@react-navigation/native";
import PageTitle from "../components/PageTitle";
import RedirectButton from "../components/RedirectButton";
import FormInputField from "../components/FormInputField";
import PrimaryButton from "../components/PrimaryButton";
import Logo from "../components/Logo";

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
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never }],
      });
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust the offset on Android
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Logo />
          <PageTitle title="Register" />
          <RedirectButton
            title="Already have an account? Login"
            onPress={() => navigation.navigate("Login" as never)}
          />
          <FormInputField
            iconName="user-secret"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <FormInputField
            iconName="envelope"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <FormInputField
            iconName="lock"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <FormInputField
            iconName="lock"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <PrimaryButton title="REGISTER" onPress={handleRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
});

export default RegisterScreen;
