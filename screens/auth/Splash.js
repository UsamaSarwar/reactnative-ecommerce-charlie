import { StyleSheet, Image, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../constants";
import logo from "../../assets/logo/logo_white.png";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("authUser");
      if (value !== null) {
        let user = JSON.parse(value);
        if (user.userType === "ADMIN") {
          setTimeout(() => {
            navigation.replace("dashboard", { authUser: JSON.parse(value) });
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.replace("tab", { user: JSON.parse(value) });
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.replace("login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    color: colors.light,
    fontSize: 50,
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
});
