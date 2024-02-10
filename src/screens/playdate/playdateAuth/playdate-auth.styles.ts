// PlaydateForm.styles.ts
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#212223",
  },
  imageBackground: {
    width: "100%",
    position: "absolute",
  },
  contentContainer: {
    paddingLeft: 30,
    justifyContent: "center",
    gap: 28,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#FFC833",
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
  connectingContainer: {
    alignSelf: "center",
  },
});

export default styles;
