import React from "react";
import {StyleSheet, FlatList, ListRenderItemInfo, View} from "react-native";
import {Game} from "types/itchio.types";
import BaseEmptyCard from "components/baseEmptyCard/base-empty-card";
import BaseCardSkeleton from "components/baseCard/base-card-skeleton";
import BaseGameCard from "components/baseGameCard/base-game-card";

type GameListProps = {
  games: Game[];
  loading: boolean;
};

const renderItem = ({item}: ListRenderItemInfo<Game>) => (
  <View style={styles.cardWrapper}>
    <BaseGameCard game={item} />
  </View>
);

const GameList: React.FC<GameListProps> = ({games, loading}) => {
  if (loading) {
    return <BaseCardSkeleton />;
  }

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={5}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<BaseEmptyCard />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  cardWrapper: {
    margin: 5
  },
});

export default GameList;
