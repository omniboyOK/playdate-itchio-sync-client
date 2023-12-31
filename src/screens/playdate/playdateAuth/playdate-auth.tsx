import React, {useEffect, useState} from "react";
import {Button, Text, TextInput, View} from "react-native-windows";
import BaseScreen from "../../../components/baseScreen/BaseScreen";
import usePlaydateStore from "../../../store/playdate";

const PlaydateForm = () => {
  const {token, isLoading, login, logout, getOwnedGames} = usePlaydateStore();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (token) {
      getOwnedGames();
    }
  });

  const submit = () => {
    login(email, password);
  };

  return (
    <BaseScreen centerContent styles={undefined}>
      <View style={{width: "50%"}}>
        {token ? (
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "#ffc833",
              padding: 15,
              margin: 7,
              borderRadius: 14,
            }}>
            <Text>Success</Text>
            <Button title="Logout" onPress={() => logout()} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "#ffc833",
              padding: 15,
              margin: 7,
              borderRadius: 14,
            }}>
            <Text
              style={{color: "#212223", fontWeight: "600", marginBottom: 5}}>
              Playdate Login
            </Text>
            <TextInput
              style={{borderColor: "black", borderRadius: 5}}
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
              placeholder="email"
              textContentType="emailAddress"
              editable={!isLoading}
            />
            <TextInput
              style={{marginTop: 5, borderColor: "black", borderRadius: 5}}
              onChange={e => setPassword(e.currentTarget.value)}
              textContentType="password"
              placeholder="password"
              secureTextEntry={true}
              value={password}
              editable={!isLoading}
            />
            <Button title="Login" onPress={submit} />
            {isLoading ? <Text>Connecting...</Text> : null}
          </View>
        )}
      </View>
    </BaseScreen>
  );
};

export default PlaydateForm;
