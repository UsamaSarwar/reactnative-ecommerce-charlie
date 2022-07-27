import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import imageCX from "../../assets/image/shirt1.png";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({ name, price, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm}>{name}</Text>
          <Text style={styles.primaryTextSm}>{price}$</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="cart" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 150,
    height: 200,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 140,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    height: 120,
    width: 120,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
});
