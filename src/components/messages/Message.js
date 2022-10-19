import {StyleSheet, View, Text } from 'react-native'
import React from 'react'

    const violet = '#ad40af';
    const orange = '#F8D548'

    const myID =  'u1';

const Message = ( {message} ) => {

    const isMe = message.user.id === myID;

  return (
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{ color: isMe ? 'white' : 'black', fontSize: 14}}>{message.content}</Text>
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