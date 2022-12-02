import {StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity, Image, TextInput, Pressable} from 'react-native';
import React, { useState, useEffect } from 'react';
import ChatRoomItem from '../components/chatRoomItem';
import IsActive from '../components/active/IsActive';
import chatRoomsData from '../dummy/ChatRoomData';
import {BASE_URL, URL} from '../loginRegister/config/API';
import socketIO from "socket.io-client";
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons";
import {launchImageLibrary} from 'react-native-image-picker';
import { updateImg } from '../loginRegister/config/updateImg';  

const options = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  };


const ENDPOINT = "http://192.168.1.4:3000";
const socket = socketIO(ENDPOINT)
const Messager = ( {navigation} ) => {
  var user_id = "";
  // var unique_id = "";

  const [dataList, setDataList] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  // var [image, setImage] = useState([]);

  var openGallery = async () => {
    const images = await launchImageLibrary(options);
    // setImage(images.assets[0]);
    // console.log(images);   
    // let res = await
    var data = {
      unique_id: user_id,
      img : images.assets[0].base64
      // img: img
  };  
    fetch(URL, {
      method: 'PUT', // or 'PUT'
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if(response == "U")
        socket.emit('uploadProfile');
        // log("success");
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
  }, []);

  useEffect(() => {
    socket.on('profile-success', () => {
      getUser();
    });
    getUser();
    
  }, [dataUser]);

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
    user_id = item.unique_id;
    var email = item.email;
    var img =  item.img;
    // console.log(img);
    return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.rowMain}>
        <Pressable onPress={openGallery}>
        <Image style={styles.image} 
        source={img == "" ? {uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} : {uri: 'http://192.168.201.1:8080/users/' + img}}/>
        </Pressable>

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>ID: </Text>
            <Text style={styles.name}>{`${user_id}`}</Text>
          </View>
            <Text numberOfLines={1} style={styles.text}>{`${email}`}</Text>
            <Text numberOfLines={1} style={styles.statusTS}>Active Now</Text>
        </View>
        <TouchableOpacity onPress={() => {
              navigation.navigate('Setting');
        }}>
            <Icon name="arrow-forward" size={30} style={styles.icon}/>
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
            {/* <TextInput style={styles.search}
            value={search}
            placeholder='Search Here ....'
            onChangeText={(text) => searchFilter(text)}
            /> */}
      
        <FlatList
        data={dataList}
        renderItem={( {item} ) => <ChatRoomItem chatRoom={item}/>}
        keyExtractor={item => `key-${item.unique_id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <FlatList
          data={dataList}
          renderItem={( {item} ) => <IsActive chatRoom={item}/>}
          keyExtractor={item => `key-${item.unique_id}`}
          showsHorizontalScrollIndicator={false}
          horizontal/>}/>
    </SafeAreaView>
  );

  console.log(user_id);
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

  rowList: {  
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  },

  // status
  isOnline: {
    backgroundColor: '#16D0FE',
      width: 18,
      height: 18,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 10,
      position: 'absolute',
      right: 20,
      bottom: 5
  },

  isOffline: {
    backgroundColor: '#ccc',
      width: 18,
      height: 18,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 10,
      position: 'absolute',
      right: 20,
      bottom: 5
      // top: 10,
  },

  statusTS: {
    color: '#16D0FE'
  }

});

export default Messager;
