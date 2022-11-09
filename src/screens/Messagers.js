import {StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import ChatRoomItem from '../components/chatRoomItem';
import IsActive from '../components/active/IsActive';
import chatRoomsData from '../dummy/ChatRoomData';
import {BASE_URL} from '../loginRegister/config/API';
import socketIO from "socket.io-client";
import Icon from "react-native-vector-icons/Ionicons";



const ENDPOINT = "http://192.168.1.5:3000";
const socket = socketIO(ENDPOINT)
const Messager = ( {navigation} ) => {
  var user_id = "";

  const [dataList, setDataList] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  // render data list users
  useEffect (()=> {
    socket.on('receiver', () => {
      getList();
    });

    socket.on('login-success', () => {
      getList();
    });

    socket.on('logout-success', () => {
      getList();
    });

    getList();
  }, [dataList]);

  useEffect(() => {
    getUser();
    
  }, []);

  getList = () => {
        const URL = BASE_URL + "homeChat.php"
        fetch(URL)
            .then((res) => res.json())
            .then((resJson) => {
                setDataList(resJson.data)
            }).catch((error) => {
                console.log('Error: ', error)
            })
    };

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

// User
  const ItemUser = ({item}) => {
    var user_id = item.unique_id;
    var email = item.email;
    return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.rowMain}>
        <Image  style={styles.image} 
        source={{ uri: 'https://i.pinimg.com/736x/99/8b/76/998b76aa2e21e43e25970bb72bfeda98.jpg'}}/>

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>ID: </Text>
            <Text style={styles.name}>{`${user_id}`}</Text>
          </View>
            <Text numberOfLines={1} style={styles.text}>{`${email}`}</Text>
            <Text numberOfLines={1} style={[styles.text, styles.isOnline]}>Active Now</Text>
        </View>
        <TouchableOpacity onPress={() => {
              navigation.goBack();
        }}>
            <Icon name="arrow-back" size={30} style={styles.icon}/>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1,}}>
            <TouchableOpacity onPress={() => { }}>
                <FlatList
                    style={styles.viewUser}
                    data={dataUser}
                    renderItem={ItemUser}
                    keyExtractor={item => `key-${item.unique_id}`}/>
            </TouchableOpacity>
      
        <FlatList
        data={dataList}
        renderItem={( {item} ) => <ChatRoomItem chatRoom={item}/>}
        keyExtractor={item => `key-${item.unique_id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <FlatList
          data={chatRoomsData}
          renderItem={( {item} ) => <IsActive chatRoom={item}/>}
          showsHorizontalScrollIndicator={false}
          horizontal/>}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 

  rowMain: {
    flexDirection: 'row',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  rightContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  row: {  
    flexDirection: 'row',
  },

  isOnline: {
    color: '#16D0FE'
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  text: {
    color: 'grey',
  },

  icon: {
    marginRight: 8
  }
});

export default Messager;
