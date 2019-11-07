import { AppRegistry } from "react-native";
import App from "./src/App";
import { Client } from 'rollbar-react-native';
const rollbar = new Client('60070a6defd04f68b747dded2d99875c');
// import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent("wild5", () => App);
