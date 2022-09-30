import React from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native-windows";
import {MAIN_STACK} from "../../../constants/routes";
import mainStackRoutes from "../mainStack/mainStackRoutes";

const Item = ({route, title, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation?.current?.navigate(MAIN_STACK, {screen: route})
      }>
      <View
        style={{
          flex: 1,
          padding: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}>
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "500",
            fontStyle: "normal",
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function NavBar({navigator}) {
  return (
    <View style={{width: 150}}>
      <FlatList
        data={mainStackRoutes}
        renderItem={({item}) => {
          return (
            <Item
              title={item.navbar}
              route={item.name}
              navigation={navigator}
              key={item.name}
            />
          );
        }}
        keyExtractor={({route}) => route}
      />
    </View>
  );
}

export default NavBar;
