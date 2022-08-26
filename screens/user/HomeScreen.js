import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import cartIcon from "../../assets/icons/cart_beg.png";
import scanIcon from "../../assets/icons/scan_icons.png";
import easybuylogo from "../../assets/logo/logo.png";
import { colors } from "../../constants";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { network } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import SearchableDropdown from "react-native-searchable-dropdown";
import { SliderBox } from "react-native-image-slider-box";

const category = [
  {
    _id: "62fe244f58f7aa8230817f89",
    title: "Garments",
    image: require("../../assets/icons/garments.png"),
  },
  {
    _id: "62fe243858f7aa8230817f86",
    title: "Electornics",
    image: require("../../assets/icons/electronics.png"),
  },
  {
    _id: "62fe241958f7aa8230817f83",
    title: "Cosmentics",
    image: require("../../assets/icons/cosmetics.png"),
  },
  {
    _id: "62fe246858f7aa8230817f8c",
    title: "Groceries",
    image: require("../../assets/icons/grocery.png"),
  },
];

const slides = [
  require("../../assets/image/banners/banner.png"),
  require("../../assets/image/banners/banner.png"),
];

const HomeScreen = ({ navigation, route }) => {
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  const { user } = route.params;
  const [products, setProducts] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [searchItems, setSearchItems] = useState([]);

  //method to convert the authUser to json object
  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  //method to navigate to product detail screen of a specific product
  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product: product });
  };

  //method to add to cart (redux)
  const handleAddToCat = (product) => {
    addCartItem(product);
  };

  var headerOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchProduct = () => {
    fetch(`${network.serverip}/products`, headerOptions) //API call
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
          setError("");
          let payload = [];
          result.data.forEach((cat, index) => {
            let searchableItem = { ...cat, id: ++index, name: cat.title };
            payload.push(searchableItem);
          });
          setSearchItems(payload);
        } else {
          setError(result.message);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log("error", error);
      });
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchProduct();
    setRefreshing(false);
  };

  //convert user to json and fetch products in initial render
  useEffect(() => {
    convertToJSON(user);
    fetchProduct();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity disabled>
          <Ionicons name="menu" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View style={styles.topbarlogoContainer}>
          <Image source={easybuylogo} style={styles.logo} />
          <Text style={styles.toBarText}>EasyBuy</Text>
        </View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : (
            <></>
          )}
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => handleProductPress(item)}
              defaultIndex={0}
              containerStyle={{
                borderRadius: 5,
                width: "100%",
                elevation: 5,
                position: "absolute",
                zIndex: 20,
                top: -20,
                maxHeight: 300,
                backgroundColor: colors.light,
              }}
              textInputStyle={{
                borderRadius: 10,
                padding: 6,
                paddingLeft: 10,
                borderWidth: 0,
                backgroundColor: colors.white,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: colors.white,
                borderColor: colors.muted,
              }}
              itemTextStyle={{
                color: colors.muted,
              }}
              itemsContainerStyle={{
                maxHeight: "100%",
              }}
              items={searchItems}
              placeholder="Search..."
              resetValue={false}
              underlineColorAndroid="transparent"
            />
            {/* <CustomInput radius={5} placeholder={"Search...."} /> */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan</Text>
              <Image source={scanIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.promotiomSliderContainer}>
            <SliderBox
              images={slides}
              sliderBoxHeight={140}
              dotColor={colors.primary}
              inactiveDotColor={colors.muted}
              paginationBoxVerticalPadding={10}
              autoplayInterval={6000}
            />
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
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item, index }) => (
                <View style={{ marginBottom: 10 }} key={index}>
                  <CustomIconButton
                    key={index}
                    text={item.title}
                    image={item.image}
                    onPress={() =>
                      navigation.jumpTo("categories", { categoryID: item })
                    }
                  />
                </View>
              )}
            />
            <View style={styles.emptyView}></View>
          </View>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>New Arrivals</Text>
          </View>
          {products.length === 0 ? (
            <View style={styles.productCardContainerEmpty}>
              <Text style={styles.productCardContainerEmptyText}>
                No Product
              </Text>
            </View>
          ) : (
            <View style={styles.productCardContainer}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refeshing}
                    onRefresh={handleOnRefresh}
                  />
                }
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                horizontal={true}
                data={products.slice(0, 4)}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <View
                    key={item._id}
                    style={{ marginLeft: 5, marginBottom: 10, marginRight: 5 }}
                  >
                    <ProductCard
                      name={item.title}
                      image={`${network.serverip}/uploads/${item.image}`}
                      price={item.price}
                      quantity={item.quantity}
                      onPress={() => handleProductPress(item)}
                      onPressSecondary={() => handleAddToCat(item)}
                    />
                  </View>
                )}
              />
              <View style={styles.emptyView}></View>
            </View>
          )}
        </ScrollView>
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
  topbarlogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",

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
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  secondaryText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  searchContainer: {
    marginTop: 10,
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
  promotiomSliderContainer: {
    margin: 5,
    height: 140,
    backgroundColor: colors.light,
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
  emptyView: { width: 30 },
  productCardContainer: {
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginLeft: 10,
    paddingTop: 0,
  },
  productCardContainerEmpty: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginLeft: 10,
    paddingTop: 0,
  },
  productCardContainerEmptyText: {
    fontSize: 15,
    fontStyle: "italic",
    color: colors.muted,
    fontWeight: "600",
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
});
