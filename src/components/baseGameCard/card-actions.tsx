import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {GameStatus} from "types/itchio.types";
import Icon from "react-native-vector-icons/Octicons";

type CardActionProps = {
  status?: GameStatus;
};

const statusIcons = {
  done: "check",
  error: "circle-slash",
  download: "download",
  sideload: "upload",
  update: "sync",
};

const CardAction: React.FC<CardActionProps> = ({status = null}) => {

  const renderContent = () => {
    switch (status) {
      case "error":
        return (
          <Text style={[styles.action]}>
            <Icon name={statusIcons.error} size={32} color={"#FF004D"} />
          </Text>
        );
      case "download":
        return (
          <Text style={[styles.action]}>
            <Icon name={statusIcons.download} size={32} color={"#F94C10"} />
          </Text>
        );
      case "done":
        return (
          <Text style={[styles.action]}>
            <Icon name={statusIcons.done} size={32} color={"#45FFCA"} />
          </Text>
        );
      case "update":
        return (
          <Text style={[styles.action]}>
            <Icon name={statusIcons.update} size={32} color={"#9400FF"} />
          </Text>
        );
      case "sideload":
        return (
          <Text style={[styles.action]}>
            <Icon name={statusIcons.sideload} size={32} color={"#F94C10"} />
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
