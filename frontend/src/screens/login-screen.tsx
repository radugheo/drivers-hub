import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { login } from "../api/auth-service";
import { useNavigation } from "@react-navigation/native";
import FormInputField from "../components/FormInputField";
import PrimaryButton from "../components/PrimaryButton";
import RedirectButton from "../components/RedirectButton";
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log("Login successful", data);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never }],
      });
    } catch (error) {
      console.error("Login failed", error);
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
          <PageTitle title="Login" />
          <RedirectButton
            title="New in the area? Sign up here"
            onPress={() => navigation.navigate("Register" as never)}
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
          <PrimaryButton title="LOGIN" onPress={handleLogin} />
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

export default LoginScreen;
