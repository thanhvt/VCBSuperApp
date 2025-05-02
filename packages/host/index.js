import {ScriptManager} from '@callstack/repack/client';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import LinearGradient to ensure native module is registered
import 'react-native-linear-gradient';

// Only set storage caching in production
// @todo: fix this to be reliable in both dev and prod
if (!__DEV__) {
  ScriptManager.shared.setStorage(AsyncStorage);
}

AppRegistry.registerComponent(appName, () => App);
