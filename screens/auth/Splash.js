import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";

const Splash = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace("login");
  }, 2000);
  return (
    <View style={styles.container}>
      <Text style={styles.splashText}>EasyBuy</Text>
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
});
