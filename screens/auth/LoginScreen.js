import { StyleSheet, Text, View } from "react-native";
import React from "react";

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
