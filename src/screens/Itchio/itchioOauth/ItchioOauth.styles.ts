// PlaydateForm.styles.ts
import {StyleSheet} from "react-native";

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
    backgroundColor: "#212223",
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

export default styles;
