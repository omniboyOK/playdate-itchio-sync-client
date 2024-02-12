import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../store/itchio";
import ShortList from "screens/Itchio/components/game-short-list";
import {ScrollView, View, StyleSheet} from "react-native"; // Importamos StyleSheet
import {
  FAVOURITE_GAMES_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
} from "constants/routes";

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
    <BaseScreen>
      <ScrollView>
        <View style={styles.container}>
          <ShortList
            games={gamestore}
            number={5}
            title={"Itchio Store"}
            loading={loadingStore}
            onPress={handleStoreNavigation}
          />
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
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    marginLeft: 25,
    marginVertical: 25,
  },
});

export default Home;
