import React from "react";
import { Image } from "react-native";
import { styles } from "./Logo.styles";

const Logo = () => (
  <Image source={require("../../../assets/logo.png")} style={styles.logo} />
);

export default Logo;
