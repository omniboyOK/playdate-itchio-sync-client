import React, {useState} from "react";
import {TextInput} from "react-native";
import {Alert, Button, Text, View} from "react-native-windows";
import {asyncLogout, checkToken, signInAsync} from "../../helper/auth";

const ItchioOAuth = () => {
  const [token, setToken] = useState(null);
  const [awaiting, setAwait] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [info, setInfo] = useState(null);

  const logout = () => {
    asyncLogout();

    setAwait(false);
    setSignedIn(false);
    setInfo(null);
    setToken(null);
  };

  const submit = () => {
    signInAsync();
    setAwait(true);
  };

  const validateToken = async () => {
    const result = await checkToken(token);
    if (result) {
      setSignedIn(true);
      setInfo(result);
    } else {
      Alert.alert(
        "Invalid Token",
        "Your token isn't valid, please copy the providen token after authorizing the app",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Try Again",
            onPress: () => {
              setAwait(false);
            },
          },
        ],
      );
    }
  };

  if (signedIn) {
    return (
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
        <Text style={{marginVertical: 15}}>{info}</Text>
        <Button title="Logout" onPress={() => logout()} />
      </View>
    );
  }

  if (awaiting) {
    return (
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
          onChangeText={token => setToken(token)}
          onSubmitEditing={token => setToken(token)}
          secureTextEntry={true}
          value={token}
          placeholder="token"
        />
        <Button
          title="Validate Token"
          onPress={() => validateToken()}
          disabled={!token}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#fa5c5c",
        flexGrow: 0,
        padding: 15,
        margin: 7,
        borderRadius: 14,
      }}>
      <Text style={{color: "#222222", fontWeight: "600", marginBottom: 5}}>
        Itchio OAuth
      </Text>
      <Button title="OAuth Login" onPress={submit} />
    </View>
  );
};

export default ItchioOAuth;
