import React from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import ProductCard from "../ProductCard/ProductCard";
import { colors, network } from "../../constants";

const NewArrivals = ({
  products,
  handleProductPress,
  handleAddToCat,
  refeshing,
  handleOnRefresh,
}) => {
  return (
    <View>
      <View style={styles.primaryTextContainer}>
        <Text style={styles.primaryText}>New Arrivals</Text>
      </View>
      {products.length === 0 ? (
        <View style={styles.productCardContainerEmpty}>
          <Text style={styles.productCardContainerEmptyText}>No Product</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  emptyView: { width: 30 },
});

export default NewArrivals;
