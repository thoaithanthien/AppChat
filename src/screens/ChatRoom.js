import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import MessageInput from '../components/messageInput/MessageInput';
import Message from '../components/messages/Message';
import chatRoomData from '../dummy/Chats';
import {useRoute, useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../loginRegister/config/API';
import socketIO from 'socket.io-client';
////////////////////////////////////
import styles from '../components/messageInput/styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {URL_ENDPOINT} from '../utils/URL_ENDPOINT';

const ENDPOINT = URL_ENDPOINT;
const socket = socketIO(ENDPOINT);
export default function ChatRoom({route}) {
  var users = route.params.users;
  var unique_id = route.params.unique_id;
  var username = route.params.username;
  var img = route.params.img;
  const [ListMess, setListMess] = useState([]);
  const [message, setMessage] = useState('');

  // console.log(users, unique_id);

  //////////////////////////
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState(null);

  post = () => {
    const URL = BASE_URL + 'messages.php';
    var Data = {
      incoming_msg_id: users,
      outgoing_msg_id: unique_id,
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(res => res.json())
      .then(res => {
        setListMess(res.data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  useEffect(() => {
    socket.on('receiver', () => {
      post();
    });
    post();
  }, []);

  ////////////////////////////////////////////////////
  // MessageInput
  // camera
  const openCamera = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      console.log('response', response);
    });
  };

  // choosePhoto
  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('response', response);
    });
  };

  const sendMessage = () => {
    const URL = BASE_URL + 'createRoom.php';
    var Data = {
      incoming_msg_id: users,
      outgoing_msg_id: unique_id,
      msg: message,
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(res => res.json())
      .catch(error => {
        console.log('Error: ', error);
      });

    // console.warn(message);
    setMessage('');
    Keyboard.dismiss();
    setIsEmojiPickerOpen(false);
  };

  const onPlusClicked = () => {
    console.warn('No message');
  };

  const onPress = () => {
    if (message) {
      socket.emit('chat-message');
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  ////////////////////////////////////////////////////////////////
  const Message = ({item}) => {
    var msg = item.msg;
    var date = item.date;
    // console.log(users);

    var outgoing_msg_id = item.outgoing_msg_id;
    const isMe = outgoing_msg_id !== users;

    return (
      <View
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
        ]}>
        <Text
          style={{
            color: isMe ? 'white' : 'black',
            fontSize: 16,
          }}>{`${msg}`}</Text>
        <Text
          style={{
            fontWeight: '300',
            fontSize: 12,
            marginTop: 2,
          }}>{`${date}`}</Text>
      </View>
    );
  };

  /////////////
  // const route = useRoute();
  const navigation = useNavigation();

  // console.warn(route.params?.id);
  navigation.setOptions({title: username});
  // navigation.setOptions({uri: img});

  return (
    <SafeAreaView style={[styles.page, (style = {flex: 1})]}>
      <FlatList
        data={ListMess}
        renderItem={Message}
        keyExtractor={item => `key-${item.room_id}`}
        inverted
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.root, {height: isEmojiPickerOpen ? '60%' : 'auto'}]}
        keyboardVerticalOffset={100}>
        {image && (
          <Image source={{uri: image}} style={{width: 100, height: 100}} />
        )}

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Pressable
              onPress={() => [
                setIsEmojiPickerOpen(currentValue => !currentValue),
                Keyboard.dismiss(),
              ]}>
              <Icon
                name="emotsmile"
                size={24}
                color="grey"
                style={styles.iconEmoji}
              />
            </Pressable>

            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Signal message..."
            />
            <Pressable onPress={handleChoosePhoto}>
              <Ionicons name="image-outline" size={24} color="grey" />
            </Pressable>
            <Pressable onPress={openCamera}>
              <Icon
                name="camera"
                size={24}
                color="grey"
                style={styles.iconEmoji}
              />
            </Pressable>
            <Icon
              name="microphone"
              size={24}
              color="grey"
              style={styles.iconMicro}
            />
          </View>

          <Pressable onPress={onPress} style={styles.buttonContainer}>
            {message ? (
              <Ionicons name="send-sharp" size={18} color="#fff" />
            ) : (
              <AntDesign name="plus" size={24} color="#fff" />
            )}
          </Pressable>
        </View>

        {isEmojiPickerOpen && (
          <EmojiSelector
            onEmojiSelected={emoji =>
              setMessage(currentMessage => currentMessage + emoji)
            }
            columns={8}
            showSearchBar={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
