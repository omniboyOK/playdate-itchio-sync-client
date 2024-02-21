import React, {useState} from "react";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native-windows";
import {BaseTextInput} from "../../../components/baseTextInput/baseTextInput";
import BgShape from "assets/images/bg-shape.svg";
import useItchioStore from "store/itchio";
import {signInApiAsync} from "helper/auth";
import BaseButton from "components/baseButton/BaseButton";
import {BACKGROUND_COLOR} from "constants/colors";

const ItchioApiLogin = () => {
  const {height, width} = useWindowDimensions();

  const [tokenInput, setTokenInput] = useState("");
  const {token, validateApiKey, awaitingToken, setAwait} = useItchioStore();

  const startSignIn = () => {
    signInApiAsync();
    setAwait(true);
  };

  const InputToken = () => (
    <>
      <Text style={styles.welcomeText}>Welcome to Playdate Sync App</Text>
      <Text style={styles.loginText}>Itchio Login</Text>
      <BaseTextInput
        value={tokenInput}
        setValue={setTokenInput}
        placeholder="Api Key"
      />
      <BaseButton
        onPress={() => validateApiKey(tokenInput)}
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
              title="Api Login"
              style={styles.buttonContainer}
              textStyle={styles.buttonText}
              disabled={awaitingToken}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#FF2449",
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
  mainContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  imageStyle: {
    position: "absolute",
    right: "30%",
  },
  innerContainer: {
    paddingLeft: 30,
    justifyContent: "center",
    gap: 28,
  },
});

export default ItchioApiLogin;
