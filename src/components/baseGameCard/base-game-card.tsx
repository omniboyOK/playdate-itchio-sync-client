import BaseCard from "components/baseCard/base-card";
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-windows";
import {Game, GameStatus} from "types/itchio.types";
import {CardAction} from "./card-actions";
import useGameStatus from "hooks/useGameStatus";
import {fetchGameDownload} from "api/itchio";

type BaseGameCardProps = {
  game: Game;
};

const BaseGameCard: React.FC<BaseGameCardProps> = ({game}) => {
  const {status} = useGameStatus(game);

  const downloadAction = () => {
    fetchGameDownload(game);
  };
  const sideloadAction = () => console.log("Sideloading", game.title);
  const doneAction = () => console.log("Game done", game.title);
  const updateAction = () => console.log("Updating", game.title);
  const errorAction = () => console.log("Error with", game.title);

  const determineAction = (status: GameStatus): (() => void) => {
    switch (status) {
      case "download":
        return downloadAction;
      case "sideload":
        return sideloadAction;
      case "done":
        return doneAction;
      case "update":
        return updateAction;
      case "error":
        return errorAction;
      default:
        return () => {};
    }
  };

  const disabledStates = status === "error" || status === "done";

  return (
    <TouchableOpacity
      onPress={determineAction(status)}
      disabled={disabledStates}>
      <BaseCard>
        <View style={styles.container}>
          <Image source={{uri: game.img}} style={styles.image} />
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
