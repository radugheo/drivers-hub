import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

interface ScoopedTabBarProps {
  children: React.ReactNode;
}

const ScoopedTabBar: React.FC<ScoopedTabBarProps> = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.fabContainer}>{children}</View> */}
      <Svg width={width} height={70} style={styles.svg}>
        <Path
          d={`M0,0 
              C${width * 0.25},0 ${width * 0.25},35 ${width * 0.5},35 
              C${width * 0.75},35 ${width * 0.75},0 ${width},0 
              L${width},70 
              L0,70 
              Z`}
          fill="white"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 35,
    zIndex: 1,
  },
  svg: {
    position: "absolute",
    bottom: 0,
  },
});

export default ScoopedTabBar;
