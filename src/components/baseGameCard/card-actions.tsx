import React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {GameStatus} from "types/itchio.types";
import Icon from "react-native-vector-icons/Octicons";

type CardActionProps = {
  status?: GameStatus;
};

const CardAction: React.FC<CardActionProps> = ({status}) => {
  const handlePress = () => {
    if (status === "download") {
      // Lógica de descarga
    } else if (status === "update") {
      // Lógica de sincronización
    }
  };

  const renderContent = () => {
    switch (status) {
      case "error":
        return (
          <Text style={[styles.action, styles.error]}>
            <Icon name="circle-slash" size={32} color={"#FF004D"} />
          </Text>
        );
      case "download":
        return (
          <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.action, styles.download]}>
              <Icon name="download" size={32} color={"#F94C10"} />
            </Text>
          </TouchableOpacity>
        );
      case "ok":
        return (
          <Text style={[styles.action, styles.ok]}>
            <Icon name="check" size={32} color={"#45FFCA"} />
          </Text>
        );
      case "update":
        return (
          <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.action, styles.update]}>
              <Icon name="sync" size={32} color={"#9400FF"} />
            </Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        status === "error" ? styles.cardDisabled : styles.action,
      ]}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  cardDisabled: {
    opacity: 0.5,
  },
  action: {
    paddingBottom: 5,
  },
  error: {},
  download: {},
  ok: {
    opacity: 0.5,
  },
  update: {},
});

export {CardAction}; // Asegúrate de no usar export default
