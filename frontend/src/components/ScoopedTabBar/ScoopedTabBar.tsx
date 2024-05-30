import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ScoopedTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={80} style={styles.svg}>
        <Path
          d={`M0,0 
              C${width * 0.8},0 ${width * 0.5},70 ${width * 0.5},70 
              C${width * 0.5},70 ${width * 0.5},0 ${width},0 
              L${width},70 
              L0,70 
              Z`}
          fill="white"
        />
      </Svg>
      <View style={styles.fabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          if (route.name === "Add Car") {
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.fab}
              >
                {/* <Svg width={24} height={24} viewBox="0 0 24 24" fill="white">
                  <Path d="M12 10.585l4.95-4.95 1.415 1.415-4.95 4.95 4.95 4.95-1.415 1.415-4.95-4.95-4.95 4.95-1.415-1.415 4.95-4.95-4.95-4.95 1.415-1.415z" />
                </Svg> */}
                <FontAwesome5 name="plus" size={24} color="white" />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? "black" : "gray",
                  size: 24,
                })}
            </TouchableOpacity>
          );
        })}
      </View>
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
    flexDirection: "row",
    position: "absolute",
    bottom: 35,
    zIndex: 1,
    width: "100%",
    justifyContent: "space-around",
  },
  svg: {
    position: "absolute",
    bottom: 0,
  },
  fab: {
    width: 60,
    height: 60,
    backgroundColor: "#092b3d",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScoopedTabBar;
