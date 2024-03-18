import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image
    source={require("../../assets/logo.png")}
    style={styles.logo}
  />
);

const styles = StyleSheet.create({
  logo: {
    width: 200, 
    height: 200, 
    alignSelf: 'center'
  },
});

export default Logo;
