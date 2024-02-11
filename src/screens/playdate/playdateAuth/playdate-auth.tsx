import React, {useEffect, useState} from "react";
import {Text, View, Image, useWindowDimensions} from "react-native-windows";
import usePlaydateStore from "../../../store/playdate";
import {BaseTextInput} from "../../../components/baseTextInput/baseTextInput";
import BaseButton from "../../../components/baseButton/BaseButton";
import BgShape from "../../../assets/images/bg-shape2.svg";
import {useNavigation} from "@react-navigation/native";
import {ITCHIO_AUTH_ROUTE} from "../../../constants/routes";
import {StyleSheet} from "react-native";
import {BACKGROUND_COLOR} from "constants/colors";

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
    <View style={styles.container}>
      <Image
        source={BgShape}
        style={[styles.imageBackground, {height: height, right: width / 2.7}]}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to Playdate Sync App</Text>
        <Text style={styles.loginText}>Playdate Login</Text>
        <BaseTextInput value={email} setValue={setEmail} placeholder="Email" />
        <BaseTextInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          _textInputProps={{secureTextEntry: true, clearTextOnFocus: true}}
        />
        <BaseButton
          onPress={submit}
          title="Login"
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
        {isLoading && (
          <View style={styles.connectingContainer}>
            <Text>Connecting...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  imageBackground: {
    width: "100%",
    position: "absolute",
  },
  contentContainer: {
    paddingLeft: 30,
    justifyContent: "center",
    gap: 28,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#FFC833",
    height: 48,
    width: 383,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
  connectingContainer: {
    alignSelf: "center",
  },
});

export default PlaydateForm;
