import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const OrderList = ({ item }) => {
  const totalOrdrItems = item.items.reduce(
    (a, obj) => a + Object.keys(obj).length,
    0
  );
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.orderlistInfoList}>
        <Text style={styles.primaryTextSm}>Order : {item?._id}</Text>
      </View>
      <View style={styles.orderlistInfoList}>
        <Text style={styles.primaryTextSm}>Placed on : {item?.createdAt}</Text>
      </View>
      <View style={styles.orderlistInfoList}>
        <Text style={styles.primaryTextSm}>{item?.user?.name}</Text>
      </View>
      <View style={styles.orderlistInfoList}>
        <View></View>
        <Text style={styles.primaryTextSm}>
          Total Item(s): {totalOrdrItems}
        </Text>
      </View>
      <View style={styles.orderlistInfoList}>
        <View>
          <Text>Status : {item?.status}</Text>
        </View>
        <Text style={styles.primaryTextSm}>Total Price : {item?.amount}$</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.muted,
    padding: 10,
    width: "100%",
    height: "auto",
    borderRadius: 15,
    elevation: 2,
    marginBottom: 10,
  },
  orderlistInfoList: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryTextSm: {
    fontWeight: "600",
  },
});
