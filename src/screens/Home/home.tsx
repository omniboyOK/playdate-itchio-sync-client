import React, {useEffect} from "react";
import useItchioStore from "../../store/itchio";
import ShortList from "screens/Itchio/components/game-short-list";
import {ScrollView, View, StyleSheet} from "react-native"; // Importamos StyleSheet
import {
  FAVOURITE_GAMES_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
} from "constants/routes";
import {BACKGROUND_COLOR} from "constants/colors";
import FLAGS from "constants/flags";

// @ts-ignore
const Home = ({navigation}) => {
  const {
    gamestore,
    ownedGames,
    favouriteGames,
    setGameStore,
    setOwnedGames,
    loadingOwned,
    loadingStore,
    loadingFavourites,
  } = useItchioStore();

  useEffect(() => {
    setOwnedGames();
    setGameStore();
  }, []);

  const handleStoreNavigation = () => navigation.navigate(ITCHIO_STORE_ROUTE);
  const handleFavouriteNavigation = () =>
    navigation.navigate(FAVOURITE_GAMES_ROUTE);
  const handleOwnedNavigation = () => navigation.navigate(ITCHIO_OWNED_ROUTE);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        {FLAGS.ITCHIO_STORE_FLAG && (
          <ShortList
            games={gamestore}
            number={5}
            title={"Itchio Store"}
            loading={loadingStore}
            onPress={handleStoreNavigation}
          />
        )}
        <ShortList
          games={ownedGames}
          number={5}
          title={"My Games"}
          loading={loadingOwned}
          onPress={handleOwnedNavigation}
        />
        <ShortList
          games={favouriteGames}
          number={5}
          title={"Favourite Games"}
          loading={loadingFavourites}
          onPress={handleFavouriteNavigation}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingBottom: 25,
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default Home;
