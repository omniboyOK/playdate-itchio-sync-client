import React, {useEffect, useState} from "react";
import {Text, View, Image, useWindowDimensions} from "react-native-windows";
import usePlaydateStore from "../../../store/playdate";
import {BaseTextInput} from "../../../components/baseTextInput/baseTextInput";
import BgShape from "../../../assets/images/bg-shape-x2.png";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {ITCHIO_AUTH_ROUTE} from "../../../constants/routes";

const PlaydateForm = () => {
  const {token, login, isLoading} = usePlaydateStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      // @ts-ignore
      navigation.navigate(ITCHIO_AUTH_ROUTE);
    }
  }, [token, navigation]);

  const submit = () => {
    login(email, password);
  };

  useEffect(() => {}, [width, isLoading]);

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#212223",
      }}>
      <Image
        source={BgShape}
        style={{
          height: height,
          width: "100%",
          position: "absolute",
          right: width / 2.7,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          paddingLeft: 30,
          justifyContent: "center",
          gap: 28,
        }}>
        <Text style={{fontSize: 24, fontWeight: "bold"}}>
          Welcome to Playdate Sync App
        </Text>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Playdate Login</Text>
        <BaseTextInput value={email} setValue={setEmail} placeholder="Email" />
        <BaseTextInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          _textInputProps={{secureTextEntry: true, clearTextOnFocus: true}}
        />
        <TouchableOpacity
          onPress={submit}
          style={{
            backgroundColor: "#FFC833",
            height: 48,
            width: 383,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
          }}>
          <Text style={{color: "black", fontSize: 18, fontWeight: "500"}}>
            Login
          </Text>
        </TouchableOpacity>
        {isLoading ? (
          <View style={{alignSelf: "center"}}>
            <Text>Connecting...</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default PlaydateForm;
