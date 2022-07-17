import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.replace("login")}>Login Screen</Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
});
