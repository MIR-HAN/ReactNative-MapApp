const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const config = {
  resolver: {
    // Fabric aramalarını ana dizine yönlendirerek "bulunamadı" hatasını bypass ediyoruz
    extraNodeModules: {
      './fabric/NativeScreensModule': path.resolve(__dirname, 'node_modules/react-native-screens/src/index.tsx'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);