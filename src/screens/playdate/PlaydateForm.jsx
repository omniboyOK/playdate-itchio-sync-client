import React, {useState} from "react";
import {Text, TextInput, View} from "react-native-windows";

const PlaydateForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#ffc833",
        flexGrow: 0,
        padding: 15,
        margin: 7,
        borderRadius: 14,
      }}>
      <Text style={{color: "#212223", fontWeight: "600", marginBottom: 5}}>
        Playdate Login
      </Text>
      <TextInput
        style={{borderColor: "black", borderRadius: 5}}
        onChange={e => setEmail(e.currentTarget.value)}
        value={email}
        placeholder="email"
        textContentType="emailAddress"
      />
      <TextInput
        style={{marginTop: 5, borderColor: "black", borderRadius: 5}}
        onChange={e => setPassword(e.currentTarget.value)}
        textContentType="password"
        placeholder="password"
        value={password}
      />
    </View>
  );
};

export default PlaydateForm;
