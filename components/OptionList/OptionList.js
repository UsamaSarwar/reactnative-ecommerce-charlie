import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const OptionList = ({
  Icon,
  iconName,
  text,
  onPress,
  type,
  onPressSecondary,
}) => {
  return (
    <>
      {type == "morden" ? (
        <View style={[styles.container, { backgroundColor: colors.white }]}>
          <View style={styles.IconContainer}>
            <Icon name={iconName} size={24} color={colors.primary} />
            <Text style={styles.listText}>{text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {onPressSecondary && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onPressSecondary}
              >
                <Icon name={"add"} size={15} color={colors.white} />
              </TouchableOpacity>
            )}
            {onPress && (
              <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                <Icon name={"eye"} size={15} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
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
      )}
    </>
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
    backgroundColor: colors.white,
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    borderRadius: 5,
    elevation: 2,
  },
});
