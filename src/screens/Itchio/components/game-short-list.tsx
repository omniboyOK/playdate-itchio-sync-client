import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Game} from "types/itchio.types";
import BaseGameCard from "components/baseGameCard/base-game-card";
import BaseCardSkeleton from "components/baseCard/base-card-skeleton";
import BaseEmptyCard from "components/baseEmptyCard/base-empty-card";
import Icon from "react-native-vector-icons/Octicons";
import {PLAYDATE_YELLOW} from "constants/colors";

type GameListProps = {
  games: Game[];
  number: number;
  title: string;
  loading?: boolean;
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
    <>
      <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {onPress && (
            <Icon name="chevron-right" size={24} color={PLAYDATE_YELLOW} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.gamesContainer}>
        {loading && <BaseCardSkeleton />}
        {limitedGames.map(item => (
          <BaseGameCard game={item} key={item.id} />
        ))}
        {!limitedGames?.length && !loading && <BaseEmptyCard />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 22,
    color: "white",
    fontFamily: "Lato-Bold",
    lineHeight: 24,
  },
  arrowText: {
    fontSize: 22,
    color: "white",
    fontFamily: "Lato-Bold",
  },
  gamesContainer: {
    flexDirection: "row",
    gap: 15,
  },
});

export default ShortList;
