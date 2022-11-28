import React, { useState, useEffect } from 'react'
import { View , Text, Image, Pressable, TouchableOpacity } from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/core';



export default function ChatRoomItem({ chatRoom }) {
  var unique_id = chatRoom.unique_id;
  var username = chatRoom.username;
  var msg = chatRoom.msg;
  var date = chatRoom.date;
  var status = chatRoom.status;
  var isActive = (status == "Active now") ? styles.isOnline : styles.isOffline;
  var user_id = '';
  // console.log(user_id);

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
  }

    return (

    <Pressable onPress={onPress} style={styles.container}>
        <Image  style={styles.image} 
        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}}/>

        {/* {chatRoom.newMessages && <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{`${unique_id}`}</Text>
        </View>} */}

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{`${username}`}</Text>
            <Text numberOfLines={1} style={[styles.text, isActive]}>{`${status}`}</Text>
            
          </View>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.text}>{`${msg}`}</Text>
            <Text numberOfLines={1} style={styles.text}>{`${date}`}</Text>
            </View>
        </View>
    </Pressable>
    
    );
}

