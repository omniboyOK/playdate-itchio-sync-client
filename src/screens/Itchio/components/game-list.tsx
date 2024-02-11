import React from "react";
import {View, StyleSheet, FlatList} from "react-native-windows";
import {BaseCard} from "components";
import {Game} from "types/itchio.types";
import BaseEmptyCard from "components/baseEmptyCard/base-empty-card";

type GameListProps = {
  games: Game[];
};

const GameList: React.FC<GameListProps> = ({games}) => {
  return (
    <FlatList
      data={games}
      renderItem={() => (
        <View style={styles.cardWrapper}>
          <BaseCard>
            <></>
          </BaseCard>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={1}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<BaseEmptyCard />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardWrapper: {
    margin: 5,
  },
});

export default GameList;
