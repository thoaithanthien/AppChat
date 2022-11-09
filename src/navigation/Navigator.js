import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
/////////////////////////////////////////
import Home from '../screens/Home';
import Setting from '../screens/Settings';
import Message from '../screens/Messagers';
import Friend from '../screens/Friend';
import ChatRoom from '../screens/ChatRoom';
import ChangePass from '../components/setting/ChangePass';
import EditProfile from '../components/setting/EditProfile'
////////////////////////
import LoginScreen from '../loginRegister/screens/LoginScreen';
import RegisterScreen from '../loginRegister/screens/RegisterScreen';
import demo from '../screens/demo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


  function MessageStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {/* <Stack.Screen name="Home" component={Home}/> */}
        <Stack.Screen name="Messages" component={Message} options={{headerTitle: MessageHeader}}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{headerTitle: ChatRoomHeader}}/>
        <Stack.Screen name="demo" component={demo} options={{headerTitle: ChatRoomHeader}}/>
      </Stack.Navigator>
    );
  };

  function SettingScreen() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Settings" component={Setting}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="ChangePass" component={ChangePass}/>
    </Stack.Navigator>
    );
  };

  const LoginRegister = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />
    </Stack.Navigator>
    )
  }


const BottomTabNavigator = () => {
    return (
        
        <Tab.Navigator initialRouteName='Home'
                        screenOptions={({route}) => ({
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;
                                let rn = route.name;

                                if(rn === 'Home') {
                                    iconName = focused
                                    ? 'home' : 'home-outline'
                                } else if(rn === 'Setting') {
                                    iconName =  focused
                                    ? 'settings' : 'settings-outline'
                                } else if(rn === 'Message') {
                                    iconName = focused
                                    ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
                                } else if(rn === 'Friend') {
                                    iconName = focused 
                                    ? 'person-add' : 'person-add-outline'
                                }
                                
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: '#ad40af'
                            
                        })}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Friend" component={Friend} />
        <Tab.Screen name="Message" component={MessageStack} 
        options={{tabBarStyle:{display: 'none'}}} />
        <Tab.Screen name="Setting" component={SettingScreen}
        options={{tabBarStyle:{display: 'none'}}} />

        </Tab.Navigator>
    );
}


const MessageHeader = (props) => {
    const { width } = useWindowDimensions();
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width,
            padding: 10,
            alignItems: 'center'}}>
            <Image 
                source={{ uri: 'https://i.pinimg.com/736x/99/8b/76/998b76aa2e21e43e25970bb72bfeda98.jpg'}}
                style={{width: 30, height: 30, borderRadius: 30}}/>
            <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>Message</Text>
            <Ionicons name="camera-outline" size={24} color="black" style={{marginRight: 10}}/>
            <AntDesign name="edit" size={24} color="black" style={{marginRight: 20}}/>         
        </View>
    )
}

const ChatRoomHeader = (props) => {
    const { width } = useWindowDimensions();
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width : width - 25,
            padding: 10,
            marginRight: 150,
            alignItems: 'center'}}>
            <Image 
                source={{ uri: 'https://i.pinimg.com/736x/99/8b/76/998b76aa2e21e43e25970bb72bfeda98.jpg'}}
                style={{width: 30, height: 30, borderRadius: 30}}/>
            <Text style={{flex: 1, fontWeight: 'bold', marginLeft: 10}}>{props.children}</Text>
            <Ionicons name="camera-outline" size={24} color="black" style={{marginRight: 10}}/>
            <AntDesign name="edit" size={24} color="black" style={{marginRight: 20}}/>         
        </View>
    )
}





export default LoginRegister;