const { StyleSheet } = require("react-native");
const { Colors } = require("../theme/colors");



const screenStyle = StyleSheet.create({

  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },

});

export { screenStyle };