import React, {useEffect, useState} from "react";
import {Button, Text, TextInput, View} from "react-native-windows";
import BaseScreen from "../../../components/baseScreen/BaseScreen";
import usePlaydateStore from "../../../store/playdate";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {ITCHIO_AUTH_ROUTE} from "../../../constants/routes";

const PlaydateForm = () => {
  const navigation = useNavigation();
  const {token, isLoading, login, logout} = usePlaydateStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    if (token) {
      // @ts-ignore
      navigation.navigate(ITCHIO_AUTH_ROUTE);
    }
  }, [token, navigation]);

  const submit = () => {
    login(email, password);
  };

  const handlePasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(e.nativeEvent.text);
  };

  const handleEmailChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEmail(e.nativeEvent.text);
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
              onChange={handleEmailChange}
              value={email}
              placeholder="email"
              textContentType="emailAddress"
              editable={!isLoading}
            />
            <TextInput
              style={{marginTop: 5, borderColor: "black", borderRadius: 5}}
              onChange={handlePasswordChange}
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
