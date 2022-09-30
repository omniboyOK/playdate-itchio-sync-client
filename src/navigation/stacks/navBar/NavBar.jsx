import React from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native-windows";
import {MAIN_STACK} from "../../../constants/routes";
import useItchioStore from "../../../store/itchio";
import {useNavigationRef} from "../../service";
import itchioStackRoutes from "../itchioStack/ItchioStackRoutes";
import mainStackRoutes from "../mainStack/mainStackRoutes";

const Item = ({route, title}) => {
  const navigation = useNavigationRef();

  return (
    <TouchableOpacity
      onPress={() => navigation.current.navigate(MAIN_STACK, {screen: route})}>
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
  const {token} = useItchioStore();

  const routes = [...mainStackRoutes, ...(token ? itchioStackRoutes : [])];
  return (
    <View style={{width: 150}}>
      <FlatList
        data={routes}
        renderItem={({item}) => {
          return (
            <Item
              title={item.navbar}
              route={item.name}
              navigation={navigator}
            />
          );
        }}
        keyExtractor={({name}) => name + "_menuBar"}
      />
    </View>
  );
}

export default NavBar;
