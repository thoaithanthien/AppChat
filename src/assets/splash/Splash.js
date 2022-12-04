import {StyleSheet, SafeAreaView, View, Text, StatusBar} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgb(32, 53, 70)"
      />
      {/* <Image style={styles.img} source={require('../../assets/img/bgTodoList.jpg')}/> */}
      <View style={styles.textForm}>
        <Text style={styles.textTitle}>Chatty</Text>
        <Text style={styles.textDescription}>
          Make friends, text, find a girlfriend!!!
        </Text>
      </View>
      <Lottie
        style={styles.lottie}
        source={require('../json/chat.json')}
        // Error 500
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 53, 70)',
  },

  textForm: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },

  textTitle: {
    fontSize: 36,
    color: '#fff',
  },

  textDescription: {
    fontSize: 18,
    fontWeight: '200',
    color: '#fff',
  },

  lottie: {
    justifyContent: 'center',
  },

  // img: {
  //     flex: 1,
  //     width: '100%',
  //     resizeMode: 'contain'
  // }
});

export default Splash;
