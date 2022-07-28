import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import cartIcon from "../../assets/icons/cart_beg.png";
import scanIcon from "../../assets/icons/scan_icons.png";
import easybuylogo from "../../assets/logo/logo.png";
import CustomInput from "../../components/CustomInput";
import { colors } from "../../constants";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { network } from "../../constants";
import { useEffect, useState } from "react";

const category = [
  {
    id: 1,
    title: "Garments",
    image: require("../../assets/icons/garments.png"),
  },
  {
    id: 2,
    title: "Electornics",
    image: require("../../assets/icons/electronics.png"),
  },
  {
    id: 3,
    title: "Cosmentics",
    image: require("../../assets/icons/cosmetics.png"),
  },
  {
    id: 4,
    title: "Groceries",
    image: require("../../assets/icons/grocery.png"),
  },
];

// var product;
// fetch(network.serverip+"/products", requestOptions)
//   .then(response => response.text())
//   .then(result => {
//     let temp = JSON.parse(result)
//     product = temp.data

//     console.log(product[1].title)

//   })
// .catch(error => console.log('error==>', error));

const product = [
  {
    id: 1,
    title: "product1",
    price: 113,
    image: require("../../assets/image/shirt.png"),
  },
  {
    id: 2,
    title: "product2",
    price: 123,
    image: require("../../assets/image/shirt1.png"),
  },
  {
    id: 3,
    title: "product3",
    price: 233,
    image: require("../../assets/image/shirt2.png"),
  },
  {
    id: 4,
    title: "product4",
    price: 343,
    image: require("../../assets/image/shirt2.png"),
  },
];

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  // var [product, setProduct] = useState([]);

  // var requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };
  // useEffect(() => {
  //   fetch(network.serverip + "/products", requestOptions)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setProduct(json?.data);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);
  const handleProductPress = (product) => {
    navigation.navigate("productdetail");
    console.log(`product:${product.id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity>
          <Ionicons name="menu" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View>
          <Text style={styles.toBarText}>Home</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.logoContainer}>
          <Image source={easybuylogo} style={styles.logo} />
          <View>
            <Text style={styles.secondaryText}>EasyBuy</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <CustomInput radius={5} placeholder={"Search...."} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan</Text>
              <Image source={scanIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>Categories</Text>
        </View>
        <View style={styles.categoryContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.flatListContainer}
            horizontal={true}
            data={category}
            renderItem={({ item }) => (
              <View style={{ marginLeft: 5, marginBottom: 10, marginRight: 5 }}>
                <CustomIconButton text={item.title} image={item.image} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.emptyView}></View>
        </View>
        <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>Most Viewed Products</Text>
        </View>
        <View style={styles.productCardContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={product}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ marginLeft: 5, marginBottom: 10, marginRight: 5 }}>
                <ProductCard
                  name={item.title}
                  image={item.image}
                  price={item.price}
                  onPress={() => handleProductPress(item)}
                />
              </View>
            )}
          />
          <View style={styles.emptyView}></View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

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
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  secondaryText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    width: "100%",
  },
  scanButtonText: {
    fontSize: 15,
    color: colors.light,
    fontWeight: "bold",
  },
  primaryTextContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 60,
    marginLeft: 10,
  },
  emptyView: { width: 20 },
  productCardContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginLeft: 10,
    paddingTop: 0,
  },
});
