import React, {useState} from "react";
import {Text, TextInput, View} from "react-native-windows";

const PlaydateForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "black",
        margin: 7,
        flexGrow: 0,
        padding: 5,
        borderRadius: 14,
      }}>
      <Text style={{backgroundColor: "black", color: "white"}}>
        Playdate Login
      </Text>
      <TextInput
        style={{margin: 3, borderRadius: 5}}
        onChange={e => setEmail(e.currentTarget.value)}
        placeholder="email"
        textContentType="emailAddress"
        value={email}
      />
      <TextInput
        style={{margin: 3, borderRadius: 5}}
        onChange={e => setPassword(e.currentTarget.value)}
        textContentType="password"
        placeholder="password"
        value={password}
      />
    </View>
  );
};

export default PlaydateForm;
