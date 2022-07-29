import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import CustomCard from "../../components/CustomCard/CustomCard";
import OptionList from "../../components/OptionList/OptionList";

const data = [
  {
    id: 1,
    title: "User",
    value: "20",
    iconName: "person",
    type: "parimary",
  },
  {
    id: 2,
    title: "Orders",
    value: "10",
    iconName: "cart",
    type: "secondary",
  },
  {
    id: 3,
    title: "Product",
    value: "3",
    iconName: "md-square",
    type: "warning",
  },
  {
    id: 4,
    title: "Catagories",
    value: "12",
    iconName: "md-logo-dropbox",
    type: "muted",
  },
];

const DashboardScreen = ({ navigation, route }) => {
  const { authUser } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("login");
          }}
        >
          <Ionicons name="log-out" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View>
          <Text style={styles.toBarText}>Dashboard</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <MaterialCommunityIcons name="menu-right" size={30} color="black" />
        <Text style={styles.headingText}>Welcome, Bukhtyar</Text>
      </View>
      <View style={{ height: 370 }}>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {data.map((data) => (
            <CustomCard
              key={data.id}
              iconName={data.iconName}
              title={data.title}
              value={data.value}
              type={data.type}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.headingContainer}>
        <MaterialCommunityIcons name="menu-right" size={30} color="black" />
        <Text style={styles.headingText}>Actions</Text>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <ScrollView style={styles.actionContainer}>
          <OptionList
            text={"Products"}
            Icon={Ionicons}
            iconName={"md-square"}
            onPress={() =>
              navigation.navigate("viewproduct", { authUser: authUser })
            }
            onPressSecondary={() =>
              navigation.navigate("addproduct", { authUser: authUser })
            }
            type="morden"
          />
          <OptionList
            text={"Categories"}
            Icon={Ionicons}
            iconName={"md-logo-dropbox"}
            onPress={() => console.log("working....")}
            onPressSecondary={() => console.log("working2....")}
            type="morden"
          />
          <View style={{ height: 20 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: colors.muted,
    fontWeight: "800",
  },
  actionContainer: { padding: 20, width: "100%", flex: 1 },
});
