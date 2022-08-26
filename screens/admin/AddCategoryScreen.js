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
import { AntDesign } from "@expo/vector-icons";

const AddCategoryScreen = ({ navigation, route }) => {
  const { authUser } = route.params; //authUser data
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("easybuycat.png");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [user, setUser] = useState({});

  //method to convert the authUser to json object.
  const getToken = (obj) => {
    try {
      setUser(JSON.parse(obj));
    } catch (e) {
      setUser(obj);
      return obj.token;
    }
    return JSON.parse(obj).token;
  };

  //Method for imput validation post data to server to insert category using API call
  const addCategoryHandle = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", authUser.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      image: image,
      description: description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setIsloading(true);
    //[check validation] -- Start
    if (title == "") {
      setError("Please enter the product title");
      setIsloading(false);
    } else if (description == "") {
      setError("Please upload the product image");
      setIsloading(false);
    } else if (image == null) {
      setError("Please upload the Catergory image");
      setIsloading(false);
    } else {
      //[check validation] -- End
      fetch(network.serverip + "/category", requestOptions) //API call
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success == true) {
            setIsloading(false);
            setAlertType("success");
            setError(result.message);
            setTitle("");
            setDescription("");
          }
        })
        .catch((error) => {
          setIsloading(false);
          setError(error.message);
          setAlertType("error");
          console.log("error", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={"Adding ..."} />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation.replace("viewproduct", { authUser: authUser });
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
          <Text style={styles.screenNameText}>Add Category</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add category details</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.formContainer}>
          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"Title"}
            placeholderTextColor={colors.muted}
            radius={5}
          />

          <CustomInput
            value={description}
            setValue={setDescription}
            placeholder={"Description"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>

      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Category"} onPress={addCategoryHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddCategoryScreen;

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
    marginTop: 10,
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
