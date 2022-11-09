import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View, Text } from 'react-native';
// import styles2 from "../style/itemList";
// import ItemList from '../item/itemList';
// import { API } from '../../constant/API';

const Home = ({ navigation}) => {
    const [DataList, setDataList] = useState([]);
    const [DataUser, setDataUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // var user_id = "";
    var date = "";
    const ItemList = ({item}) => {
        var unique_id = item.unique_id;
        var username = item.username;
        // var date = item.date;
        // var status = item.status; 
        return (
            <View>
                <TouchableOpacity style={{}}
                    onPress={() => {
                        navigation.navigate("ChatRoom", {
                            unique_id: unique_id,
                            username: username,
                            // status: status,
                            users: user_id
                            
                        })
                    }}>
                    <View style={{}}><Text>============</Text></View>
                    <View style={{}}>
                        <Text style={{fontSize: 20}}>{`${unique_id}`}</Text>
                        <Text style={{fontSize: 20}}>{`${username}`}</Text>
                        <Text style={{fontSize: 20}}>{`${item.email}`}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    };

    const ItemUser = ({item}) => {
        user_id = item.unique_id;
        // var email = item.email;
        // var password = item.password;
        // return (
        //     // <View style={styles.container}>
        //     //     <View style={styles.item}>
        //     //         <Text style={styles.title}>{`${user_id}`}</Text>
        //     //         <Text style={styles.title}>{`${email}`}</Text>
        //     //         {/* <Text style={styles.title}>{`${password}`}</Text> */}
        //     //     </View>
        //     // </View>

        // );
    };
    useEffect(() => {
        getList();
        
    }, []);

    useEffect(() => {
        getUser();
        
    }, []);
    getList = () => {
        const URL = "http://192.168.201.1:8080/users/api/homeChat.php"
        fetch(URL)
            .then((res) => res.json())
            .then((resJson) => {
                setDataList(resJson.data)
            }).catch((error) => {
                console.log('Error: ', error)
            })
    };

    getUser = () => {
        const URL = "http://192.168.201.1:8080/users/api/user.php"
        fetch(URL)
            .then((res) => res.json())
            .then((resJson) => {
                setDataUser(resJson.data)
            }).catch((error) => {
                console.log('Error: ', error)
            })
    };
    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { }}>
                <FlatList
                    style={styles.viewUser}
                    data={DataUser}
                    renderItem={ItemUser}
                    keyExtractor={item => `key-${item.unique_id}`}
                />
            </TouchableOpacity>
            <FlatList
                data={DataList}
                renderItem={ItemList}
                keyExtractor={item => `key-${item.unique_id}`}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },

    viewUser: {
        marginHorizontal: 10
    }

});



export default Home;