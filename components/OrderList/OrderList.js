import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const OrderList = ({ item, onPress }) => {
  let totalItem = 0;
  item.items.forEach((element) => {
    ++totalItem;
  });
  const totalOrdrItems = totalItem;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
          {item?.status == "pending" ? (
            <View style={styles.pendingStatus}>
              <Text style={styles.statusText}>{item?.status}</Text>
            </View>
          ) : item?.status == "shipped" ? (
            <View style={styles.shippedStatus}>
              <Text style={styles.statusText}>{item?.status}</Text>
            </View>
          ) : item?.status == "delivered" ? (
            <View style={styles.deliveredStatus}>
              <Text style={styles.deliveredStatusText}>{item?.status}</Text>
            </View>
          ) : (
            <></>
          )}
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
  pendingStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    padding: 5,
    backgroundColor: colors.warning,
    height: "auto",
    borderRadius: 5,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.dark,
  },
  deliveredStatusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
  },
  shippedStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    padding: 5,
    backgroundColor: colors.success,
    height: "auto",
    borderRadius: 5,
  },
  deliveredStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    padding: 5,
    backgroundColor: colors.primary,
    height: "auto",
    borderRadius: 5,
  },
});
