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
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#312f28",
        margin: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: "white",
          fontFamily: "Arial",
          lineHeight: 20,
          marginVertical: 5,
        }}>
        #{index + 1} - {item.title} ({item.id})
      </Text>
      <Image
        style={{width: "100%", height: 150, borderRadius: 4, marginVertical: 5}}
        width={250}
        height={250}
        source={{uri: item.img}}
      />
      <Image
        style={{
          width: 25,
          height: 25,
          tintColor: "white",
          alignSelf: "flex-end",
          marginVertical: 5,
        }}
        source={require("../../../assets/images/sync.png")}
        width={25}
        height={25}
      />
    </View>
  );

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={item => item.title}
      numColumns={4}
    />
  );
};

export default GameList;
