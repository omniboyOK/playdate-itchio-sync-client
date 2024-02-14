import BaseCard from "components/baseCard/base-card";
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-windows";
import {Game} from "types/itchio.types";
import {CardAction} from "./card-actions";
import {useGameStatus} from "hooks";
import {saveGame} from "helper/itchio";
import usePlaydateStore from "store/playdate";

type BaseGameCardProps = {
  game: Game;
};

const BaseGameCard: React.FC<BaseGameCardProps> = ({game}) => {
  const status = useGameStatus(game);
  const {sideLoadGame} = usePlaydateStore();

  const checkStatus = ["ok", "error"].includes(status || "");

  const handleDownload = () => {
    saveGame(game);
  };

  const handleUpdate = () => {
    saveGame(game);
  };

  const handleSideload = () => {
    sideLoadGame(game.id);
  };

  const action = () => {
    switch (status) {
      case "download":
        return handleDownload;
      case "update":
        return handleUpdate;
      case "ok":
        return null;
      case "ready":
        return handleSideload;
      case "error":
        return null;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity disabled={checkStatus} onPress={action}>
      <BaseCard disabled={checkStatus}>
        <View style={styles.container}>
          <Image
            source={{uri: game?.img || game.cover_url}}
            style={styles.image}
          />
          <Text style={styles.title} numberOfLines={2}>
            {game.title}
          </Text>
          <CardAction status={status} />
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
  },
  image: {
    flex: 5,
    borderRadius: 4,
  },
  title: {
    marginTop: 5,
    flex: 4,
    fontSize: 13,
    fontFamily: "Latto-Bold",
    fontWeight: "bold",
  },
});

export default BaseGameCard;
