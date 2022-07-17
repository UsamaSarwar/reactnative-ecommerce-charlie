import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants";

const CustomButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
