import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../store/itchio";
import ShortList from "screens/Itchio/components/game-short-list";
import {ScrollView} from "react-native-windows";

const Home = () => {
  const games = useItchioStore(state => state.gamestore);
  const fetchGames = useItchioStore(state => state.setGameStore);
  useEffect(() => {
    fetchGames();
  }, [games]);

  return (
    <BaseScreen
      styles={{backgroundColor: "#212223", padding: 25}}
      centerContent={undefined}>
      <ScrollView style={{flex: 1}}>
        <ShortList games={games} number={5} title={"Itchio Store"} />
        <ShortList games={[]} number={0} title={"My Games"} />
        <ShortList games={[]} number={0} title={"Favourite Games"} />
      </ScrollView>
    </BaseScreen>
  );
};

export default Home;
