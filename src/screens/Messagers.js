import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ChatRoomItem from '../components/chatRoomItem';
import IsActive from '../components/active/IsActive';
import {BASE_URL, URL} from '../loginRegister/config/API';
import socketIO from 'socket.io-client';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {URL_ENDPOINT} from '../utils/URL_ENDPOINT';
import {useNavigation} from '@react-navigation/core';

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
};

const ENDPOINT = URL_ENDPOINT;
const socket = socketIO(ENDPOINT);
const Messager = ({navigation}) => {
  var user_id = '';

  const [dataList, setDataList] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  var [image, setImage] = useState([]);

  var openGallery = async () => {
    const images = await launchImageLibrary(options);
    // setImage(images.assets[0]);
    // console.log(images);
    // let res = await
    var data = {
      unique_id: user_id,
      img: images.assets[0].base64,
      // img: img
    };
    fetch(URL, {
      method: 'PUT', // or 'PUT'
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        if (response == 'U') socket.emit('uploadProfile');
        // log("success");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // render data list users
  useEffect(() => {
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

  getUser = () => {
    const URL = BASE_URL + 'user.php';
    fetch(URL)
      .then(res => res.json())
      .then(resJson => {
        setDataUser(resJson.data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  getList = () => {
    const URL = BASE_URL + 'homeChat.php';
    fetch(URL)
      .then(res => res.json())
      .then(resJson => {
        setDataList(resJson.data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  // is Active
  const ItemIsActive = ({item}) => {
    

    // const navigation = useNavigation();
    const onPress = () => {
      navigation.navigate('ChatRoom', {
        unique_id: unique_id,
        username: username,
        msg: msg,
        date: date,
        img: img,
        status: status,
        users: user_id,
      });
    };

    var unique_id = item.unique_id;
    var username = item.username;
    var msg = item.msg;
    var date = item.date;
    var status = item.status;
    var img = item.img;
    var isActive =
      status == 'Active now' ? styles.isOnlineIAT : styles.isOfflineIAT;

    return (
      <Pressable onPress={onPress}>
        <View style={styles.containerIAT}>
          <Image
            style={styles.imageIAT}
            source={
              img == ''
                ? {
                    uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                  }
                : {uri: 'http://192.168.201.1:8080/users/' + img}
            }
          />
          <Text style={[styles.textIAT, isActive]}>{`${status}`}</Text>
          <Text numberOfLines={1} style={styles.nameIAT}>{`${username}`}</Text>
        </View>
      </Pressable>
    );
  };

  // list user
  const ItemList = ({item}) => {
    const onPress = () => {
      navigation.navigate('ChatRoom', {
        unique_id: unique_id,
        username: username,
        msg: msg,
        img: img,
        date: date,
        status: status,
        users: user_id,
      });
    };

    var unique_id = item.unique_id;
    var username = item.username;
    var msg = item.msg;
    var date = item.date;
    var img = item.img;
    var status = item.status;
    var isActive = status == 'Active now' ? styles.isOnline : styles.isOffline;
    return (
      /// list user
      <Pressable onPress={onPress} style={styles.container}>
        <Image
          style={styles.image}
          source={
            img == ''
              ? {
                  uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                }
              : {uri: 'http://192.168.201.1:8080/users/' + img}
          }
        />

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{`${username}`}</Text>
            <Text
              numberOfLines={1}
              style={[styles.text, isActive]}>{`${status}`}</Text>
          </View>
          <View style={styles.rowItemlist}>
            <Text numberOfLines={1} style={styles.text}>{`${msg}`}</Text>
            <Text numberOfLines={1} style={styles.text}>{`${date}`}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  // User
  const ItemUser = ({item}) => {
    user_id = item.unique_id;
    var email = item.email;
    var img = item.img;
    var username = item.username;
    // console.log('fff' + img);
    return (
      <TouchableOpacity onPress={() => {}} style={styles.container}>
        <View style={styles.rowMain}>
          <Pressable onPress={openGallery}>
            <Image
              style={styles.image}
              source={
                img == ''
                  ? {
                      uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                    }
                  : {uri: 'http://192.168.201.1:8080/users/' + img}
              }
            />
          </Pressable>

          <View style={styles.rightContainer}>
            <View style={styles.row}>
              <Text style={styles.name}>ID: </Text>
              <Text style={styles.name}>{`${user_id}`}</Text>
            </View>
            <Text numberOfLines={1} style={styles.text}>{`${username}`}</Text>
            <Text numberOfLines={1} style={styles.statusTS}>
              Active Now
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings', {email: email});
            }}>
            <Icon name="ios-settings-outline" size={30} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <TouchableOpacity onPress={() => {}}>
        <FlatList
          style={styles.viewUser}
          data={dataUser}
          renderItem={ItemUser}
          keyExtractor={item => `key-${item.unique_id}`}
        />
      </TouchableOpacity>

      <FlatList
            data={dataList}
            renderItem={ItemIsActive}
            keyExtractor={item => `key-${item.unique_id}`}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

      <FlatList
        data={dataList}
        renderItem={ItemList}
        keyExtractor={item => `key-${item.unique_id}`}
        showsVerticalScrollIndicator={false}/>
        {/* // ListHeaderComponent={() => ( */}
          
        {/* )}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
  },

  rowItemlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  text: {
    color: 'grey',
  },

  icon: {
    marginRight: 8,
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
    bottom: 5,
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
    bottom: 5,
    // top: 10,
  },

  statusTS: {
    color: '#16D0FE',
  },

  // IS Active
  containerIAT: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 22
  },

  imageIAT: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 10,
  },

  // badgeContainer: {
  //     backgroundColor: '#16D0FE',
  //     width: 18,
  //     height: 18,
  //     borderWidth: 1,
  //     borderColor: '#fff',
  //     borderRadius: 10,
  //     position: 'absolute',
  //     left: 54,
  //     top: 10,
  //   },

  nameIAT: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  isOnlineIAT: {
    backgroundColor: '#16D0FE',
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    left: 54,
    color: '#16D0FE',
    top: 10,
  },

  isOfflineIAT: {
    backgroundColor: '#ccc',
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    color: '#ccc',
    left: 54,
    top: 10,
  },

  textIAT: {
    color: '#000',
  },
});

export default Messager;
