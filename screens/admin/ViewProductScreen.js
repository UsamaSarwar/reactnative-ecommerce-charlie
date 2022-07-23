import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../../components/ProductList/ProductList";
import productImage from "../../assets/image/shirt.png";
import productImage1 from "../../assets/image/shirt1.png";
import productImage2 from "../../assets/image/shirt2.png";

const ViewProductScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all products</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <ProductList
          image={productImage}
          title={"Dry Fit Sports"}
          category={"Shirts"}
          price={700}
          qantity={5}
          onPressView={() => {
            console.log("view is working");
          }}
          onPressEdit={() => {
            console.log("edit is working");
          }}
          onPressDelete={() => {
            console.log("delete is working");
          }}
        />
        <ProductList
          image={productImage1}
          title={"Super Fit Sports"}
          category={"Shirts"}
          price={700}
          qantity={0}
          onPressView={() => {
            console.log("view is working");
          }}
          onPressEdit={() => {
            console.log("edit is working");
          }}
          onPressDelete={() => {
            console.log("delete is working");
          }}
        />
        <ProductList
          image={productImage2}
          title={"Print T-Shirt"}
          category={"Shirts"}
          price={1200}
          qantity={5}
          onPressView={() => {
            console.log("view is working");
          }}
          onPressEdit={() => {
            console.log("edit is working");
          }}
          onPressDelete={() => {
            console.log("delete is working");
          }}
        />
        <ProductList
          image={productImage}
          title={"Dry Fit Sports"}
          category={"Shirts"}
          price={700}
          qantity={15}
          onPressView={() => {
            console.log("view is working");
          }}
          onPressEdit={() => {
            console.log("edit is working");
          }}
          onPressDelete={() => {
            console.log("delete is working");
          }}
        />
        <ProductList
          image={productImage}
          title={"Dry Fit Sports"}
          category={"Shirts"}
          price={800}
          qantity={70}
          onPressView={() => {
            console.log("view is working");
          }}
          onPressEdit={() => {
            console.log("edit is working");
          }}
          onPressDelete={() => {
            console.log("delete is working");
          }}
        />
        <ProductList
          image={productImage}
          title={"Dry Fit Sports"}
          category={"Shirts"}
          price={700}
          qantity={0}
          onPressView={() => {
            console.log("view is working");
          }}
          onPressEdit={() => {
            console.log("edit is working");
          }}
          onPressDelete={() => {
            console.log("delete is working");
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ViewProductScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
});
