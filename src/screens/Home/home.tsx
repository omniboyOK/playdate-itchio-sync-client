import React, {useEffect} from "react";
import ShortList from "screens/Itchio/components/game-short-list";
import {ScrollView, View, StyleSheet} from "react-native"; // Importamos StyleSheet
import {
  FAVOURITE_GAMES_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
} from "constants/routes";
import {BACKGROUND_COLOR} from "constants/colors";
import FLAGS from "constants/flags";
import useItchioStoreData from "hooks/useItchioStoreData";
import useItchioOwnedGamesData from "hooks/useItchioOwnedGamesData";
import useItchioStore from "store/itchio";
import usePlaydateStore from "store/playdate";

// @ts-ignore
const Home = ({navigation}) => {
  const {
    fetchItchioStore,
    games: storeGames,
    isLoading: isLoadingStoreGames,
  } = useItchioStoreData();
  const {
    fetchItchioOwnedGames,
    games: ownedGames,
    isLoading: isLoadingOwnedGames,
  } = useItchioOwnedGamesData();
  const {signInPlaydateAsync} = usePlaydateStore();

  const favouriteGames = useItchioStore(state => state.favouriteGames);

  useEffect(() => {
    signInPlaydateAsync();
    fetchItchioStore(1);
    fetchItchioOwnedGames();
  }, [fetchItchioStore, fetchItchioOwnedGames]);

  const handleStoreNavigation = () => navigation.navigate(ITCHIO_STORE_ROUTE);
  const handleFavouriteNavigation = () =>
    navigation.navigate(FAVOURITE_GAMES_ROUTE);
  const handleOwnedNavigation = () => navigation.navigate(ITCHIO_OWNED_ROUTE);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        {FLAGS.ITCHIO_STORE_FLAG && (
          <ShortList
            games={storeGames}
            number={5}
            title={"Itchio Store"}
            loading={isLoadingStoreGames}
            onPress={handleStoreNavigation}
          />
        )}
        <ShortList
          games={ownedGames}
          number={5}
          title={"My Games"}
          loading={isLoadingOwnedGames}
          onPress={handleOwnedNavigation}
        />
        <ShortList
          games={favouriteGames}
          number={5}
          title={"Favourite Games"}
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
