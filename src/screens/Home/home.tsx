import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../store/itchio";
import ShortList from "screens/Itchio/components/game-short-list";
import {ScrollView, View} from "react-native-windows";
import {
  FAVOURITE_GAMES_ROUTE,
  ITCHIO_OWNED_ROUTE,
  ITCHIO_STORE_ROUTE,
} from "constants/routes";

// TODO: Fix type safety
// @ts-ignore
const Home = ({navigation}) => {
  const games = useItchioStore(state => state.gamestore);
  const fetchGames = useItchioStore(state => state.setGameStore);
  const isLoading = useItchioStore(state => state.loadingGames);

  useEffect(() => {
    fetchGames();
  }, [games]);

  const handleStoreNavigation = () => navigation.navigate(ITCHIO_STORE_ROUTE);
  const handleFavouriteNavigation = () =>
    navigation.navigate(FAVOURITE_GAMES_ROUTE);
  const handleOwnedNavigation = () => navigation.navigate(ITCHIO_OWNED_ROUTE);

  return (
    <BaseScreen>
      <ScrollView>
        <View style={{flex: 1, gap: 15}}>
          <ShortList
            games={games}
            number={5}
            title={"Itchio Store"}
            loading={isLoading}
            onPress={handleStoreNavigation}
          />

          <ShortList
            games={[]}
            number={0}
            title={"My Games"}
            loading={false}
            onPress={handleOwnedNavigation}
          />
          <ShortList
            games={[]}
            number={0}
            title={"Favourite Games"}
            loading={false}
            onPress={handleFavouriteNavigation}
          />
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

export default Home;
