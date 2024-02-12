import BaseCard from "components/baseCard/base-card";
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-windows";
import {Game} from "types/itchio.types";

type BaseGameCardProps = {
  game: Game;
};

const BaseGameCard: React.FC<BaseGameCardProps> = ({game}) => {
  return (
    <TouchableOpacity>
      <BaseCard disabled={!!game.status}>
        <View style={styles.container}>
          <Image
            source={{uri: game?.img || game.cover_url}}
            style={styles.image}
          />
          <Text style={styles.title} numberOfLines={2}>
            {game.title}
          </Text>
          <CardAction status={game?.status} />
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

const CardAction: React.FC<{status?: string}> = ({status}) => {
  if (!status) {
    return null;
  }

  return <Text style={styles.action}>action</Text>;
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
  action: {
    flex: 4,
    alignSelf: "center",
    padding: 5,
  },
});

export default BaseGameCard;
