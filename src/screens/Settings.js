import React, {useState, useEffect} from "react";
import { View, Text,FlatList, TouchableOpacity, StyleSheet, Dimensions, Switch, SafeAreaView, StatusBar} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { BASE_URL } from '../loginRegister/config/API';
import socketIO from "socket.io-client";

const {width, height} = Dimensions.get("window");
const ENDPOINT = "http://192.168.1.76:3000";
const socket = socketIO(ENDPOINT)

const SettingScreen = ({navigation}) => {
    var user_id = "";
    // console.log(user_id);
  const [dataUser, setDataUser] = useState([]);


    const [isBackground, setBackground] = useState(false);
    const backgroundSwitch = () => setBackground(previousBackground => !previousBackground);

    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState2 => !previousState2);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const background = isBackground ? styles.blackBackground : styles.whiteBackground;
    const title = isBackground ? styles.whiteTitle : styles.blackTitle;
    const iconColor = isBackground ? styles.whiteIcon : styles.blackIcon;

    const ItemUser = ({item}) => {
        user_id = item.unique_id;
        var email = item.email;
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>{`${user_id}`}</Text>
                    <Text style={styles.title}>{`${email}`}</Text>
                </View>
            </View>
    
        );
    };

    useEffect(() => {
        getUser();
        
      }, []);

      getUser = () => {
        const URL = BASE_URL + "user.php"
        fetch(URL)
            .then((res) => res.json())
            .then((resJson) => {
                setDataUser(resJson.data)
            }).catch((error) => {
                console.log('Error: ', error)
            })
    };
  

    var logout = () => {
        var LoginAPI = BASE_URL + "logout.php"
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        var data = {
            logout_id : user_id
        };

        fetch(LoginAPI,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    }
    
    
    return(
        <SafeAreaView style={[background, styles.background]}>    
        <StatusBar barStyle="light-content" hidden={false}/>    
            <View style={[styles.container]}>
                <TouchableOpacity onPress={() => {
                  navigation.goBack();
                }}>
                    <Icon name="arrow-back" size={30} style={[styles.icon, iconColor]}/>
                </TouchableOpacity>
                <Text style= {[styles.title, title]}>Settings</Text>
                <View style={styles.smallContainer}>
                    <Icon name="person" size={20} style={[iconColor, styles.icon2]}/>
                    <Text style={[styles.title2, title]}>Account</Text>
                </View>
                <View style={styles.containerDefault}>
                    <TouchableOpacity style={styles.touchableContainer} 
                    onPress={() => {
                    navigation.navigate('EditProfile')
                    }}>
                        <Text style={styles.title3}>Edit Profile</Text>
                        <Icon name="chevron-forward-outline" size={20} style= {iconColor}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableContainer} 
                        onPress={() => {
                        navigation.navigate('ChangePass', isBackground) 
                        
                    }}>
                        <Text style={styles.title3}>Change Password</Text>
                        <Icon name="chevron-forward-outline" size={20} style= {iconColor}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableContainer}>
                        <Text style={styles.title3}>Privacy</Text>
                        <Icon name="chevron-forward-outline" size={20} style= {iconColor}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.smallContainer}>
                    <Icon name="book" size={20} style={[iconColor, styles.icon2]}/>
                    <Text style={[styles.title2, title]}>Notification</Text>
                </View>
                <View style={styles.containerDefault}>
                    <View style= {styles.touchableContainer}>
                        <Text style={[styles.title3]}>Notifications</Text>
                        <Switch  
                            trackColor={{ false: "#666666", true: "#ad40af" }}
                            thumbColor={isEnabled ? "#F8D548" : "#CCCCCC"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                    <View style= {styles.touchableContainer}>
                        <Text style={styles.title3}>App Notifications</Text>
                        <Switch  
                            trackColor={{ false: "#666666", true: "#ad40af" }}
                            thumbColor={isEnabled2 ? "#F8D548" : "#CCCCCC"}
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                    <View style= {styles.touchableContainer}>
                        <Text style={styles.title3}>Night mode</Text>
                        <Switch  
                            trackColor={{ false: "#666666", true: "#ad40af" }}
                            thumbColor={isBackground ? "#F8D548" : "#CCCCCC"}
                            onValueChange={backgroundSwitch}
                            value={isBackground}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                </View>
                <View style={styles.smallContainer}>
                    <Icon name="duplicate" size={20} style={[iconColor, styles.icon2]}/>
                    <Text style={[styles.title2, title]}>More</Text>
                </View>
                <View style={styles.containerDefault}>
                    <TouchableOpacity style={styles.touchableContainer}>
                        <Text style={styles.title3}>Languages</Text>
                        <Icon name="chevron-forward-outline" size={20} style= {iconColor}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableContainer}>
                        <Text style={styles.title3}>Country</Text>
                        <Icon name="chevron-forward-outline" size={20} style= {iconColor}></Icon>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { 
                    logout();
                    navigation.navigate("Login");
                    socket.emit("logout");
                    
                }} style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <Icon name="log-out-outline" size={30} style={iconColor}></Icon>
                    <Text style={[styles.title3, title]}>LOGOUT</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                <FlatList
                    style={styles.viewUser}
                    data={dataUser}
                    renderItem={ItemUser}
                    keyExtractor={item => `key-${item.unique_id}`}/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        height: height,
        width: width,
    }, 

    whiteBackground: {
        backgroundColor: "white"
    },

    blackBackground:{
        backgroundColor: "#222222"
    },

    container: {
        marginHorizontal: 10,
        marginTop: 30,
    },

    smallContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },

    containerDefault: {
        borderColor: "silver", 
        borderTopWidth: 1, 
        marginVertical: 15
    },

    touchableContainer: {
        width: width - 20,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    whiteIcon: {
        color: "white",
    },
    blackIcon: {
        color: "black",
    },
    icon: {
        marginLeft: 5,
        marginTop: -15,
    },

    icon2: {
        marginLeft: 10,
        marginTop: 10,
    },

    whiteTitle: {
        color: "#FFF",
    },
    blackTitle: {
        color: "#000",
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        fontStyle: 'normal',
        marginLeft: 10,
        marginTop: 10,
    },

    title2: {
        fontSize: 20,
        fontWeight: "600",
        fontStyle: 'normal',
        marginLeft: 10,
        marginTop: 10,
    },

    title3: {
        fontSize: 15,
        marginLeft: 10,
        fontWeight: "500",
        color: "#999999"
    }
});

export default SettingScreen;