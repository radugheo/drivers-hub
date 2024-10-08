import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { loginApiCall } from "../../api/api-service";
import { useNavigation } from "@react-navigation/native";
import RedirectButton from "../../components/RedirectButton/RedirectButton";
import PageTitle from "../../components/PageTitle/PageTitle";
import Logo from "../../components/Logo/Logo";
import { storeString } from "../../utils/storage-handler";
import { styles } from "./LoginScreen.styles";
import OpacityButton from "../../components/OpacityButton/OpacityButton";
import FormAuthField from "../../components/FormAuthField/FormAuthField";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginApiCall(email, password);
      console.log("Login successful", data);
      await storeString("userToken", data.token);
      await storeString("userId", data.id.toString());
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never }],
      });
    } catch (error) {
      console.warn("Login failed", error);
      Alert.alert(
        "Error signing in",
        "Invalid email and password combination.",
        [{ text: "Dismiss" }],
      );
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
          <OpacityButton title="LOGIN" onPress={handleLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
