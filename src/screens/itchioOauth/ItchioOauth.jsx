import React, {useCallback, useEffect, useState} from "react";
import {TextInput} from "react-native";
import useItchioStore from "../../store/itchio";
import {Button, Text, View} from "react-native-windows";
import {signInAsync} from "../../helper/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseScreen from "../../components/baseScreen/BaseScreen";

const ItchioOAuth = () => {
  const [tokenInput, setTokenInput] = useState();
  const {token, logout, validateToken, awaitingToken, setAwait} =
    useItchioStore();

  const startSignIn = () => {
    signInAsync();
    setAwait(true);
  };

  const asyncLogin = useCallback(async () => {
    const accessToken = await AsyncStorage.getItem("userToken");
    validateToken(accessToken);
  }, []);

  useEffect(() => {
    asyncLogin();
  }, [asyncLogin]);

  const Success = () => (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#fa5c5c",
        flexGrow: 0,
        padding: 15,
        margin: 7,
        borderRadius: 14,
      }}>
      <Text>Success</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );

  const InputToken = () => (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#fa5c5c",
        flexGrow: 0,
        padding: 15,
        margin: 7,
        borderRadius: 14,
      }}>
      <Text>Enter Token</Text>
      <TextInput
        style={{borderColor: "black", borderRadius: 5, marginVertical: 5}}
        onChangeText={token => setTokenInput(token)}
        onSubmitEditing={token => setTokenInput(token)}
        secureTextEntry={true}
        value={tokenInput}
        placeholder="token"
      />
      <Button
        title="Validate Token"
        onPress={() => validateToken(tokenInput)}
        disabled={!tokenInput}
      />
    </View>
  );

  return (
    <BaseScreen centerContent>
      <View style={{width: "50%"}}>
        {token ? Success() : null}
        {awaitingToken && !token ? InputToken() : null}
        {!token && !awaitingToken ? (
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "#fa5c5c",
              flexGrow: 0,
              padding: 15,
              margin: 7,
              borderRadius: 14,
            }}>
            <Text
              style={{color: "#222222", fontWeight: "600", marginBottom: 5}}>
              Itchio OAuth
            </Text>
            <Button title="OAuth Login" onPress={startSignIn} />
          </View>
        ) : null}
      </View>
    </BaseScreen>
  );
};

export default ItchioOAuth;
