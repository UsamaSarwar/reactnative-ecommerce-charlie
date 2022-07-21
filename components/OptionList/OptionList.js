import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const OptionList = ({ Icon, iconName, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.IconContainer}>
        <Icon name={iconName} size={24} color={colors.primary} />
        <Text style={styles.listText}>{text}</Text>
      </View>
      <View>
        <MaterialIcons
          name="arrow-forward-ios"
          size={24}
          color={colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OptionList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary_light,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 5,
    marginBottom: 15,
  },
  IconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
});
