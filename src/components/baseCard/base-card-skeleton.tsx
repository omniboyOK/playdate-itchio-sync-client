import {ACRYLIC_COLOR} from "constants/colors";
import {BASE_CARD_HEIGHT, BASE_CARD_WIDTH, CARD_PADDING} from "constants/theme";
import React, {useEffect, useRef} from "react";
import {Animated, StyleSheet} from "react-native-windows";

const BaseCardSkeleton = () => {
  // Create an animated value
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop the animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  // Interpolate the animated value to colors
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#393A3B", "#212223"],
  });

  return <Animated.View style={[styles.container, {backgroundColor}]} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ACRYLIC_COLOR,
    height: BASE_CARD_HEIGHT,
    width: BASE_CARD_WIDTH,
    borderRadius: 8,
    padding: CARD_PADDING,
  },
});

export default BaseCardSkeleton;
