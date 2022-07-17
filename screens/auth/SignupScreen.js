import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SignupScreen = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.replace("login")}>Login Screen</Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
