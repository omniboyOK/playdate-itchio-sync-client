import BaseCard from "components/baseCard/base-card";
import React from "react";
import {Image, StyleSheet, Text} from "react-native";
import {Game} from "types/itchio.types";

type BaseGameCardProps = {
  game: Game;
};

const BaseGameCard: React.FC<BaseGameCardProps> = ({game}) => {
  return (
    <BaseCard>
      <Image source={{uri: game.img}} style={styles.image} />
      <Text style={styles.title}>{game.title}</Text>
      <CardAction status={game?.status} />
    </BaseCard>
  );
};

const CardAction: React.FC<{status?: string}> = ({status}) => {
  if (!status) {
    return null;
  }

  return <Text style={styles.action}>action</Text>;
};

const styles = StyleSheet.create({
  image: {
    flex: 5,
    borderRadius: 4,
  },
  title: {
    flex: 4,
    fontSize: 12,
    fontFamily: "Latto-Bold",
  },
  action: {
    flex: 4,
    alignSelf: "center",
    padding: 5,
  },
});

export default BaseGameCard;
