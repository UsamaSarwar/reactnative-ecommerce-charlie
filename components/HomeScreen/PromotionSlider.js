import React from "react";
import { View, StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { colors } from "../../constants";

const PromotionSlider = ({ slides }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  promotiomSliderContainer: {
    margin: 5,
    height: 140,
    backgroundColor: colors.light,
  },
});

export default PromotionSlider;
