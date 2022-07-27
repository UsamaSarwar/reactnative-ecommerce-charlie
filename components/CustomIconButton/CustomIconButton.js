import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import garmentsIcon from "../../assets/icons/garments.png";

const CustomIconButton = ({ text, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 40,
    width: 110,
    elevation: 3,
  },
  buttonText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "bold",
  },
  buttonIcon: {
    height: 20,
    width: 35,
    resizeMode: "contain",
  },
});
