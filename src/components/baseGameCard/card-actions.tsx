import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {GameStatus} from "types/itchio.types";
import Icon from "react-native-vector-icons/Octicons";

type CardActionProps = {
  status?: GameStatus;
};

const CardAction: React.FC<CardActionProps> = ({status = null}) => {
  const renderContent = () => {
    switch (status) {
      case "error":
        return (
          <Text style={[styles.action]}>
            <Icon name="circle-slash" size={32} color={"#FF004D"} />
          </Text>
        );
      case "download":
        return (
          <Text style={[styles.action]}>
            <Icon name="download" size={32} color={"#F94C10"} />
          </Text>
        );
      case "ok":
        return (
          <Text style={[styles.action]}>
            <Icon name="check" size={32} color={"#45FFCA"} />
          </Text>
        );
      case "update":
        return (
          <Text style={[styles.action]}>
            <Icon name="sync" size={32} color={"#9400FF"} />
          </Text>
        );
      case "ready":
        return (
          <Text style={[styles.action]}>
            <Icon name="upload" size={32} color={"#F94C10"} />
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, styles.action]}>{renderContent()}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  action: {
    paddingBottom: 5,
  },
});

export {CardAction}; // Asegúrate de no usar export default
