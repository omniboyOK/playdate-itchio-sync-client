import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/Octicons";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native-windows";
import useItchioStore from "store/itchio";
import Avatar from "assets/images/default-avatar.jpg";
import Clipboard from "@react-native-clipboard/clipboard";
import {GAMES_FOLDER, purgeGameFolder} from "helper/fs";
import {clearAsyncStorage} from "helper/debug";
import { asyncPlaydateLogout } from "helper/playdate";

const CustomHeader = () => {
  const {token, getAccountInfo, account, logout, clearOwnedGames} =
    useItchioStore();

  const {link, image, name} = account;

  useEffect(() => {
    getAccountInfo(token);
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  const goToProfile = () => {
    return link ? Linking.openURL(link) : undefined;
  };

  const copyFolderRoute = () => {
    Clipboard.setString(GAMES_FOLDER);
  };

  const clearAllCache = () => {
    purgeGameFolder();
    clearAsyncStorage();
    asyncPlaydateLogout();
    clearOwnedGames();
    logout();
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row-reverse",
          margin: 15,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <TouchableOpacity onPress={goToProfile} style={{flexDirection: "row"}}>
          <Image
            source={
              image
                ? {
                  uri: image,
                }
                : Avatar
            }
            style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              marginHorizontal: 5,
            }}
          />
          <Text style={style.text}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            marginHorizontal: 10,
          }}>
          <Icon name="sign-out" size={14} style={{alignSelf: "center"}} />
          <Text style={{lineHeight: 14}}>Sign Out</Text>
        </TouchableOpacity>
        {__DEV__ ? (
          <>
            <TouchableOpacity
              onPress={copyFolderRoute}
              style={{
                justifyContent: "center",
              }}>
              <Icon
                name="file-directory"
                size={14}
                style={{
                  alignSelf: "center",
                  margin: 5,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={clearAllCache}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 3,
                  padding: 3,
                }}>
                <Icon
                  name="bug"
                  size={14}
                  style={{
                    alignSelf: "center",
                  }}
                />
                <Text style={{lineHeight: 14}}>Clean Cache</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
    color: "white",
  },
});

export default CustomHeader;
