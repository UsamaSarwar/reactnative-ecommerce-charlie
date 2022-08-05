import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";

const CustomAlert = ({ message, type }) => {
  return (
    <View style={{ width: "100%" }}>
      {message != "" ? (
        <View style={[styles.alertContainer, styles[`alertContainer_${type}`]]}>
          <Text>{message}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  alertContainer: {
    padding: 5,
    marginTop: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
    textAlign: "center",
  },
  alertContainer_error: {
    backgroundColor: colors.danger,
  },
  alertContainer_success: {
    backgroundColor: colors.success,
  },
});
