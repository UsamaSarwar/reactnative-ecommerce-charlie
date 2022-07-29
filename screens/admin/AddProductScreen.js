import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import ProgressDialog from "react-native-progress-dialog";

const AddProductScreen = ({ navigation }) => {
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [quanlity, setQuantity] = useState("");

  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth-token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ5MGUzNDI4OTI1YjYxNjVmOTA2NTgiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY1OTA0MzU2NywiZXhwIjoxNjU5MDc5NTY3fQ.V0ydzJM8MJqN23Tx5trQ_gDZh5wR9KhpKakrWImb8PA"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    title: title,
    sku: sku,
    price: price,
    image: "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addProductHandle = () => {
    setIsloading(true);
    if (title == "") {
      setError("Please enter the product title");
    } else if (price == 0) {
      setError("Please enter the product price");
    } else if (price == 0) {
      setError("Please enter the product price");
    } else if (image == null) {
      setError("Please upload the product image");
    } else {
      fetch(network.serverip + "/product", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            setError(result.message);
            navigation.goBack();
          }
          console.log(result);
        })
        .catch((error) => {
          setError(error.message);
          console.log("error", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
          <Text style={styles.screenNameText}>Add Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add product details</Text>
        </View>
      </View>
      <CustomAlert message={error} type={"error"} />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                onPress={pickImage}
              />
            ) : (
              <TouchableOpacity
                style={styles.imageHolder}
                onPress={pickImage}
              ></TouchableOpacity>
            )}
          </View>

          <CustomInput
            value={sku}
            setValue={setSku}
            placeholder={"SKU"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"Title"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={price}
            setValue={setPrice}
            placeholder={"Price"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={quanlity}
            setValue={setQuantity}
            placeholder={"Quantity"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Product"} onPress={addProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
  },
});
