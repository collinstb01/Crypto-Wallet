module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["expo-router/babel"],
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [["module:react-native-dotenv"]],
  };
};
