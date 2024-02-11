import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native-windows";
import {Game} from "types/itchio.types";
import BaseEmptyCard from "components/baseEmptyCard/base-empty-card";
import BaseCardSkeleton from "components/baseCard/base-card-skeleton";
import BaseGameCard from "components/baseGameCard/base-game-card";

type GameListProps = {
  games: Game[];
  loading: boolean;
};

const renderItem = ({item}: ListRenderItemInfo<Game>) => (
  <BaseGameCard game={item} />
);

const GameList: React.FC<GameListProps> = ({games, loading}) => {
  if (loading) {
    return <BaseCardSkeleton />;
  }

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      initialNumToRender={10}
      numColumns={1}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<BaseEmptyCard />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cardWrapper: {
    margin: 5,
  },
});

export default GameList;
