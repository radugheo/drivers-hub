import React, { useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please ensure the passwords match before proceeding.",
      );
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
    } catch (error) {
      console.error("Registration failed", error);
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
            onChangeText={setUsername}
          />
          <FormAuthField
            iconName="envelope"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <FormAuthField
            iconName="lock"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <FormAuthField
            iconName="lock"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <OpacityButton title="REGISTER" onPress={handleRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
