/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ChatRoom from './src/screens/ChatRoom';
import {name as appName} from './app.json';
import Splash from './src/assets/splash/Splash';
import { Component } from 'react';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {currentScreen : 'Splash'};
        setTimeout(() => {
            this.setState({ currentScreen: 'App' })
        }, 4000);
    }
    render() {
        const { currentScreen } = this.state;
        let mainScreen = currentScreen === 'Splash' ? <Splash/> : <App/>
        return mainScreen
    }

}

AppRegistry.registerComponent(appName, () => App);
