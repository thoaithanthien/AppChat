import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
  
    },
  
    badgeContainer: {
      backgroundColor: '#FF3506',
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 45,
      top: 10,
    },
  
    badgeText: {
      color: '#fff',
      fontSize: 12,
    },
  
    rightContainer: {
      flex: 1,
      justifyContent: 'center'
    },
  
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 10,
    },
  
    row: {  
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    name: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 3,
    },
  
    text: {
      color: 'grey',
    },
  });

  export default styles;