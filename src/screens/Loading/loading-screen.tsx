import {ACRYLIC_COLOR} from "constants/colors";
import {CARD_PADDING} from "constants/theme";
import React, {useEffect, useRef} from "react";
import {Animated, StyleSheet, useWindowDimensions} from "react-native-windows";

const BaseLoader = () => {
  const {height, width} = useWindowDimensions();
  const styles = style(height, width);

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

const style = (height: number, width: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: ACRYLIC_COLOR,
      height: height,
      width: width,
      borderRadius: 8,
      padding: CARD_PADDING,
    },
  });

export default BaseLoader;
