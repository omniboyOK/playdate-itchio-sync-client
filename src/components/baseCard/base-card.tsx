import {ACRYLIC_COLOR, ACRYLIC_HIGHLIGHT} from "constants/colors";
import {BASE_CARD_HEIGHT, BASE_CARD_WIDTH, CARD_PADDING} from "constants/theme";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native-windows";

type BaseCardProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const BaseCard: React.FC<BaseCardProps> = ({children, disabled = false}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <View
      style={[
        style.container,
        isHovered && !disabled ? style.hovered : style.normal,
      ]}
      onMouseEnter={disabled ? undefined : handleMouseEnter}
      onMouseLeave={disabled ? undefined : handleMouseLeave}>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: ACRYLIC_COLOR,
    height: BASE_CARD_HEIGHT,
    width: BASE_CARD_WIDTH,
    borderRadius: 8,
    padding: CARD_PADDING,
  },
  normal: {
    backgroundColor: ACRYLIC_COLOR,
  },
  hovered: {
    backgroundColor: ACRYLIC_HIGHLIGHT,
  },
});

export default BaseCard;
