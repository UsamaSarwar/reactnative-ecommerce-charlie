import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.replace("signup")}>Signup Screen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
});
