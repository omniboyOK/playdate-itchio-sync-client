import React, {useEffect, useState} from "react";
import {Text, View, Image, useWindowDimensions} from "react-native-windows";
import {BaseTextInput} from "../../../components/baseTextInput/baseTextInput";
import BgShape from "../../../assets/images/bg-shape.svg";
import {useNavigation} from "@react-navigation/native";
import {ITCHIO_STORE_ROUTE} from "../../../constants/routes";
import useItchioStore from "store/itchio";
import {signInAsync} from "helper/auth";
import BaseButton from "components/baseButton/BaseButton";
import styles from "./ItchioOauth.styles";

const ItchioOauth = () => {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();

  const [tokenInput, setTokenInput] = useState("");
  const {token, validateToken, awaitingToken, setAwait} = useItchioStore();

  const startSignIn = () => {
    signInAsync();
    setAwait(true);
  };

  useEffect(() => {
    if (token) {
      // @ts-ignore
      navigation.navigate(ITCHIO_STORE_ROUTE);
    }
  }, [token]);

  const InputToken = () => (
    <>
      <Text style={styles.welcomeText}>Welcome to Playdate Sync App</Text>
      <Text style={styles.loginText}>Itchio Login</Text>
      <BaseTextInput
        value={tokenInput}
        setValue={setTokenInput}
        placeholder="Token"
      />
      <BaseButton
        onPress={() => validateToken(tokenInput)}
        title="Continue"
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        disabled={!tokenInput}
      />
    </>
  );

  return (
    <View style={styles.mainContainer}>
      <Image
        source={BgShape}
        style={[
          styles.imageStyle,
          {height: height, width: "100%", right: width / 2.7},
        ]}
        resizeMode="contain"
      />
      <View style={styles.innerContainer}>
        {awaitingToken && !token ? InputToken() : null}
        {!token && !awaitingToken ? (
          <>
            <Text style={styles.welcomeText}>Welcome to Playdate Sync App</Text>
            <Text style={styles.loginText}>Itchio Login</Text>
            <BaseButton
              onPress={startSignIn}
              title="OAuth Login"
              style={styles.buttonContainer}
              textStyle={styles.buttonText}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default ItchioOauth;
