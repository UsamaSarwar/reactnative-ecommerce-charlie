import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import { colors } from "../../constants";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CartProductList = ({ image, title, price, handleDelete }) => {
  const rightSwipe = () => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons
            name="delete"
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.productImage} />
          </View>
          <View style={styles.productInfoContainer}>
            <Text style={styles.productTitle}>{title}</Text>
            <Text style={styles.productPrice}>{price} $</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default CartProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 120,
    borderRadius: 15,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  productInfoContainer: {
    padding: 10,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
  },
  productPrice: {
    fontSize: 15,
    color: colors.primary,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_light,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    width: 70,
    elevation: 3,
  },
});
