import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";

const ProductList = ({
  category,
  price,
  title,
  image,
  qantity,
  onPressView,
  onPressEdit,
  onPressDelete,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressView}>
      <View style={styles.innerContainer}>
        <View>
          {image != null ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={styles.ImageContainer}></View>
          )}
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{title}</Text>
          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Category: </Text>
            <Text>{category}</Text>
          </View>
          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Price: </Text>
            <Text>{price}</Text>
          </View>
          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>SKU: </Text>
            <Text>{qantity <= 0 ? "Out of Stock" : qantity}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onPressEdit}
        >
          <MaterialIcons name={"edit"} size={15} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.danger }]}
          onPress={onPressDelete}
        >
          <MaterialIcons name={"delete"} size={15} color={colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  ImageContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  productInfoContainer: {
    paddingLeft: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    borderRadius: 5,
    elevation: 2,
  },
  productInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productInfoItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
  },
});
