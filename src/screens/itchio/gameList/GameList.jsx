import React, {useCallback, useEffect, useState} from "react";
import {FlatList, Image, Text, View} from "react-native-windows";
import {getAllPotentialPlaydateGameNames} from "../../../helper/itchio";

const GameList = () => {
  const [games, setGames] = useState([]);
  const fetchGames = useCallback(getAllPotentialPlaydateGameNames);

  useEffect(() => {
    fetchGames()
      .then(data => {
        setGames(data);
      })
      .catch(console.error);
  }, [fetchGames]);

  const renderItem = ({item, index}) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        backgroundColor: "#3f3421",
        margin: 5,
        padding: 12,
        borderRadius: 5,
      }}>
      <Text style={{color: "white", fontFamily: "Arial", lineHeight: 20}}>
        #{index} - {item}
      </Text>
      <Image
        style={{width: 25, height: 25, tintColor: "white"}}
        source={require("../../../assets/images/sync.png")}
        width={25}
        height={25}
      />
    </View>
  );

  return (
    <FlatList
      style={{backgroundColor: "#111"}}
      data={games}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
  );
};

export default GameList;
