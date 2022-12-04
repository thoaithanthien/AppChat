import React, { useEffect, useState } from 'react'
import { View , Text, Image, Pressable, FlatList } from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/core';

var user_id = "";
export default function IsActive({ chatRoom }) {
    var unique_id = chatRoom.unique_id;
    var username = chatRoom.username;
    var msg = chatRoom.msg;
    var date = chatRoom.date;
    var status = chatRoom.status;
    var img = chatRoom.img;
    var isActive = (status == "Active now") ? styles.isOnline : styles.isOffline;

    const [DataUser, setDataUser] = useState([]);

    const navigation = useNavigation();
    const onPress = () => {
    navigation.navigate('ChatRoom', 
    { unique_id: unique_id,
      username: username,
      msg: msg,
      date: date,
      status: status,
      users: user_id
    })
  };

  const ItemUser = ({item}) => {
    user_id = item.unique_id;
    console.log(user_id);
  };

  useEffect(() => {
    getUser();
}, []);

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

    return(
      <View>
        <Pressable onPress={onPress}>
          <View style={styles.container}>
              <Image  style={styles.image} 
              source={img == "" ? {uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} : {uri: 'http://192.168.201.1:8080/users/' + img}}/>
              <Text style={[styles.text, isActive]}>{`${status}`}</Text>          
              <Text  numberOfLines={1} style={styles.name}>{`${username}`}</Text>
          </View>
        </Pressable>
        <FlatList
                    style={styles.viewUser}
                    data={DataUser}
                    renderItem={ItemUser}
                    keyExtractor={item => `key-${item.unique_id}`}
                />
      </View>
    );
}