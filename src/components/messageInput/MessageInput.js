import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useRoute, useNavigation} from '@react-navigation/native';

const MessageInput = ({route}) => {
  var user = route.params.users;
  var unique_id = route.params.unique_id;

  console.log(user, unique_id);
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState(null);

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
    const URL = 'http://192.168.201.1:8080/users/api/createRoom.php';
    var Data = {
      incoming_msg_id: user,
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

    console.warn(message);
    setMessage('');
    Keyboard.dismiss();
    setIsEmojiPickerOpen(false);
  };

  const onPlusClicked = () => {
    console.warn('No message');
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  return (
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
  );
};

export default MessageInput;
