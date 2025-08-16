import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomIconButton from "../CustomIconButton/CustomIconButton";
import { colors } from "../../constants";

const CategoryList = ({ category, navigation }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.primaryText}>Categories</Text>
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
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginLeft: 10,
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
  emptyView: { width: 30 },
});

export default CategoryList;
