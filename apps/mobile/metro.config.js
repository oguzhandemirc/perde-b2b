const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
const nativewindConfig = withNativewind(config, { inlineRem: 16 });

// react-native-css 3.1.0-rc.0 redirects `react-native` imports to a wrapper whose export
// list lacks `AssetRegistry` (added to react-native's index in 0.88). expo-asset reads it,
// so expo-font and local asset resolution fail. expo-asset renders no components, so it
// can import the real react-native. Remove once react-native-css exports AssetRegistry.
const EXPO_ASSET_DIR = `${path.sep}node_modules${path.sep}expo-asset${path.sep}`;
const nativewindResolveRequest = nativewindConfig.resolver.resolveRequest;

nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native' && context.originModulePath.includes(EXPO_ASSET_DIR)) {
    return context.resolveRequest(context, moduleName, platform);
  }
  return nativewindResolveRequest(context, moduleName, platform);
};

module.exports = nativewindConfig;
