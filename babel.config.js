module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["module:react-native-dotenv",
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@components": "./src/components/index",
          "@hooks": "./src/hooks/index",
        },
      },
    ]],
};
