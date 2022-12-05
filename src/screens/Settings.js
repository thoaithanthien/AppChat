import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL, URL} from '../loginRegister/config/API';
import socketIO from 'socket.io-client';
import {launchImageLibrary} from 'react-native-image-picker';
import {URL_ENDPOINT} from '../utils/URL_ENDPOINT';
import {updateName} from '../loginRegister/config/APIReset';

const {width, height} = Dimensions.get('window');
const ENDPOINT = URL_ENDPOINT;
const socket = socketIO(ENDPOINT);

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
};

const SettingScreen = ({navigation, route}) => {
  var user_id = '';
  var email = route.params.email;
  // console.log(email);
  const [dataUser, setDataUser] = useState([]);
  const [name, setName] = useState([]);
  // change name
  const insert = () => {
    // navigation.navigate('Security');
    if (name.length == 0) {
      alert('Vui lòng nhập đầy đủ thông tin');
    } else {
      updateName(email, name, navigation);
    }

    // setName('');
    Keyboard.dismiss();
  };

  /// upload avatar
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

  const ItemUser = ({item}) => {
    user_id = item.unique_id;
    var img = item.img;
    var email = item.email;
    var username = item.username;
    // console.log(img);
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
            <View style={styles.colum}>
              <TextInput
                style={styles.nameTextInput}
                placeholder={`${username}`}
                onChangeText={setName}
                value={name}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  insert();
                }}
                style={styles.btnLogin}>
                <Text numberOfLines={1} style={styles.statusTS}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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

  var logout = () => {
    var LoginAPI = BASE_URL + 'logout.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var data = {
      logout_id: user_id,
    };

    fetch(LoginAPI, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="light-content" hidden={false} />
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="arrow-back"
            size={30}
            style={[styles.icon, styles.blackIcon]}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        {/* <View style={styles.smallContainer}>
          <Icon
            name="person"
            size={20}
            style={[styles.blackIcon, styles.icon2]}
          />
          <Text style={styles.title2}>Account</Text>
        </View> */}
        <TouchableOpacity onPress={() => {}}>
          <FlatList
            style={styles.viewUser}
            data={dataUser}
            renderItem={ItemUser}
            keyExtractor={item => `key-${item.unique_id}`}
          />
        </TouchableOpacity>

        {/* ------------------------------------------ */}
        <View style={styles.smallContainer}>
          <Material
            name="security"
            size={20}
            style={[styles.blackIcon, styles.icon2]}
          />
          <Text style={styles.title2}>Security</Text>
        </View>
        <View style={styles.containerDefault}>
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={() => {
              navigation.navigate('SetQuestion');
            }}>
            <Text style={styles.title3}>SetQuestion</Text>
            <Icon
              name="chevron-forward-outline"
              size={20}
              style={styles.blackIcon}></Icon>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.touchableContainer}
            onPress={() => {
              navigation.navigate('ChangePass');
            }}>
            <Text style={styles.title3}>Change Password</Text>
            <Icon
              name="chevron-forward-outline"
              size={20}
              style={styles.blackIcon}></Icon>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.touchableContainer}>
            <Text style={styles.title3}>Privacy</Text>
            <Icon
              name="chevron-forward-outline"
              size={20}
              style={styles.blackIcon}></Icon>
          </TouchableOpacity> */}
        </View>
        {/* More --------------- */}
        <View style={styles.smallContainer}>
          <Icon
            name="duplicate"
            size={20}
            style={[styles.blackIcon, styles.icon2]}
          />
          <Text style={styles.title2}>More</Text>
        </View>
        <View style={styles.containerDefault}>
          <TouchableOpacity style={styles.touchableContainer}>
            <Text style={styles.title3}>Languages</Text>
            <Icon
              name="chevron-forward-outline"
              size={20}
              style={styles.blackIcon}></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableContainer}>
            <Text style={styles.title3}>Country</Text>
            <Icon
              name="chevron-forward-outline"
              size={20}
              style={styles.blackIcon}></Icon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            logout();
            navigation.navigate('Login');
            socket.emit('logout');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon
            name="log-out-outline"
            size={30}
            style={styles.blackIcon}></Icon>
          <Text style={styles.title3}>LOGOUT</Text>
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
    backgroundColor: 'white',
  },

  blackBackground: {
    backgroundColor: '#222222',
  },

  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },

  smallContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerDefault: {
    borderColor: 'silver',
    borderTopWidth: 1,
    marginVertical: 15,
  },

  touchableContainer: {
    width: width - 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  whiteIcon: {
    color: 'white',
  },
  blackIcon: {
    color: 'black',
  },
  icon: {
    marginLeft: 5,
  },

  icon2: {
    marginLeft: 10,
    marginTop: 10,
  },

  whiteTitle: {
    color: '#FFF',
  },
  blackTitle: {
    color: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontStyle: 'normal',
    marginLeft: 10,
    marginTop: 10,
  },

  title2: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    marginLeft: 10,
    marginTop: 10,
  },

  title3: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '500',
    color: '#999999',
  },

  // user
  rowMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 5,
  },

  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  colum: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  nameTextInput: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 30
  },

  statusTS: {
    color: '#fff',
  },

  btnLogin: {
    backgroundColor: '#ad40af',
    padding: 7,
    borderRadius: 2,
    paddingHorizontal: 25
  },
});

export default SettingScreen;
