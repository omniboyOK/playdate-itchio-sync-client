import React, {useState} from "react";
import {FlatList, ImageBackground, Text, View} from "react-native-windows";
import {BaseIconButton} from "components";
import ActionList from "../components/actionList/ActionList";

const GameList = ({games = [], id = ""}) => {
  const [viewType, setView] = useState("grid");

  const renderItemGrid = ({item, index}) => (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#312f28",
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        maxWidth: "20%",
        elevation: 5,
      }}
      resizeMode="cover"
      source={{uri: item?.img || item?.cover_url}}>
      <View
        style={{
          flexDirection: "column",
        }}>
        <View
          style={{
            marginVertical: 5,
            padding: 5,
            borderRadius: 5,
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          }}>
          <Text style={{color: "white", fontFamily: "Arial", lineHeight: 20}}>
            #{index + 1} - {item.title} ({item.id})
          </Text>
        </View>
        <ActionList game={item} />
      </View>
    </ImageBackground>
  );

  const renderItemList = ({item, index}) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        backgroundColor: "#312f28",
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: "white",
          fontFamily: "Arial",
          fontSize: 18,
          lineHeight: 20,
          marginVertical: 5,
        }}>
        #{index + 1} - {item.title}
      </Text>
      <View>
        <Text
          style={{
            tintColor: "white",
            alignSelf: "flex-end",
          }}>
          Game ID: {item.id}
        </Text>
        <ActionList />
      </View>
    </View>
  );

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 25,
        }}>
        <BaseIconButton
          pressed={viewType === "list"}
          onPress={() => setView("list")}
          icon={require("../../assets/images/list.png")}
        />
        <BaseIconButton
          pressed={viewType === "grid"}
          onPress={() => setView("grid")}
          icon={require("../../assets/images/grid.png")}
        />
      </View>

      {viewType === "list" ? (
        <FlatList
          key={"listview"}
          data={games}
          renderItem={renderItemList}
          keyExtractor={item => item.id + id}
          numColumns={1}
        />
      ) : (
        <FlatList
          key={"gridview"}
          data={games}
          renderItem={renderItemGrid}
          keyExtractor={item => item.id + id}
          numColumns={4}
        />
      )}
    </>
  );
};

export default GameList;
