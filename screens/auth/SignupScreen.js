import { StyleSheet, Text, Image, StatusBar, View, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/logo.png";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const signUpHandle = () => {
    console.log(email, password, name);
    setError("")
    if(!email.includes("@")){
      return setError("Email is not valid")
    }
    if(email.length < 6){
      return setError("Email is too short")
    }
    if(password.length < 8){
      return setError("Password must be 8 characters long")
    }
    if(password != confirmPassword){
      return setError("password does not match")
    }
    return alert("Signed Up Successfully!!");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{width:"100%"}}>
      <StatusBar></StatusBar>
      <View style={styles.welconeContainer}>
        <Image style={styles.logo} source={header_logo} />
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Sign up</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomAlert message={error} type={"error"} />
        <CustomInput
          value={name}
          setValue={setName}
          placeholder={"Name"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={"Email"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          placeholder={"Password"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
        <CustomInput
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
          placeholder={"Confirm Password"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
      </View>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Sign up"} onPress={signUpHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate("login")}
          style={styles.signupText}
        >
          Login
        </Text>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding:10
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});
