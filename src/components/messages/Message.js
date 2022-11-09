import {StyleSheet, View, Text } from 'react-native'
import React from 'react'

    const violet = '#ad40af';
    const orange = '#F8D548';
    // var users = "";
const Message = ( {message} ) => {
    var users = message.users;
    var msg = message.msg;
    var date = message.date;
    console.log(users);

    const isMe = outgoing_msg_id == users;
    var outgoing_msg_id = message.outgoing_msg_id;

  return (
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{ color: isMe ? 'white' : 'black', fontSize: 14}}>{`${msg}`}</Text>
      <Text>{`${date}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },

    leftContainer: {
      backgroundColor: orange,
      marginLeft: 10,
      marginRight: 'auto',
    },

    rightContainer: {
      backgroundColor: violet,
      marginLeft: 'auto',
      marginRight: 10,
    }

    
});

export default Message