import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Game} from "types/itchio.types";
import BaseGameCard from "components/baseGameCard/base-game-card";
import BaseCardSkeleton from "components/baseCard/base-card-skeleton";
import BaseEmptyCard from "components/baseEmptyCard/base-empty-card";

type GameListProps = {
  games: Game[];
  number: number;
  title: string;
  loading: boolean;
  onPress?: () => void;
};

const ShortList: React.FC<GameListProps> = ({
  games,
  number,
  title,
  loading = false,
  onPress,
}) => {
  const limitedGames = games.slice(0, number);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
        <Text style={styles.titleText}>{title}</Text>
        {onPress && <Text style={styles.arrowText}>{">"}</Text>}
      </TouchableOpacity>
      <View style={styles.gamesContainer}>
        {loading && <BaseCardSkeleton />}
        {limitedGames.map(item => (
          <BaseGameCard game={item} key={item.id} />
        ))}
        {!limitedGames?.length && !loading && <BaseEmptyCard />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10, // Note: 'gap' is not supported in all versions of React Native. Consider using margin instead.
  },
  titleText: {
    fontSize: 22,
    color: "white",
    fontFamily: "Lato-Bold",
    marginBottom: 10,
  },
  arrowText: {
    fontSize: 22,
    color: "white",
    fontFamily: "Lato-Bold",
    marginBottom: 10,
  },
  gamesContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 15, // Similar note as above regarding 'gap'.
  },
});

export default ShortList;
