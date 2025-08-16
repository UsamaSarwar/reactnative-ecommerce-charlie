import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { colors } from "../../constants";
import scanIcon from "../../assets/icons/scan_icons.png";

const SearchBar = ({ searchItems, handleProductPress }) => {
  return (
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Scan</Text>
          <Image source={scanIcon} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchBar;
