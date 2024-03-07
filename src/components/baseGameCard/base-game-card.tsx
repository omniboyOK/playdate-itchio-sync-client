import BaseCard from "components/baseCard/base-card";
import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-windows";
import {Game, GameStatus} from "types/itchio.types";
import {CardAction} from "./card-actions";
import {fetchGameDownload} from "api/itchio-service";
import useItchioStore from "store/itchio";
import BaseCardSkeleton from "components/baseCard/base-card-skeleton";

type BaseGameCardProps = {
  game: Game;
};

const BaseGameCard: React.FC<BaseGameCardProps> = ({game}) => {
  const {setGameStatus} = useItchioStore();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const downloadAction = async () => {
    try {
      setLoading(true);
      await fetchGameDownload(game);
      await setGameStatus(game, "sideload");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // Add clean logic for file and asyncstorage
    }
  };

  const sideloadAction = () => console.log("Sideloading", game.title);

  const doneAction = () => console.log("Game done", game.title);

  const updateAction = () => downloadAction();

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

  useEffect(() => {
    const disabledStates = ["error", "done", "not_owned"];

    if (game.status) {
      setDisabled(disabledStates.includes(game.status));
    }
  }, [game.status]);

  if (loading) {
    return <BaseCardSkeleton />;
  }

  return (
    <TouchableOpacity
      onPress={determineAction(game.status)}
      disabled={disabled}>
      <BaseCard>
        <View style={styles.container}>
          <Image source={{uri: game.img}} style={styles.image} />
          <Text style={styles.title} numberOfLines={2}>
            {game.title}
          </Text>
          <CardAction status={game.status} />
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
