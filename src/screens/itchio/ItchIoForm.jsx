import React, {useState} from "react";
import {Button, Text, TextInput, View} from "react-native-windows";
import {login} from "../../api/itchio";

const ItchioForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);

  const submit = () => {
    login(email, password)
      .then(data => setToken(data))
      .catch(e => console.log(e));
    console.log(token);
  };

  if (token) {
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
        Itchio Login
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
      <Button title="Login" onPress={submit} />
    </View>
  );
};

export default ItchioForm;
