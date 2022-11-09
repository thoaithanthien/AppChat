import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
      },

    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 10
      },
    
    badgeContainer: {
        backgroundColor: '#16D0FE',
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        position: 'absolute',
        left: 54,
        top: 10,
      },
    
    name: {
        fontWeight: 'bold',
        fontSize: 16,
      },

});

export default styles;