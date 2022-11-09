import React from 'react'
import { StyleSheet } from 'react-native'

    const violet = '#ad40af';
    const orange = '#F8D548';

const styles = StyleSheet.create({
    root: {
        padding: 10,
        height: '60%',
    },

    row: {
        flexDirection: 'row',
    },

    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginRight: 10,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },

    iconEmoji: {
        marginHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    iconMicro: {
        marginRight: 15,
    },

    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ad40af',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },


    /////message
    leftContainer: {
        backgroundColor: orange,
        marginLeft: 10,
        marginRight: 'auto',
      },
  
      rightContainer: {
        backgroundColor: violet,
        marginLeft: 'auto',
        marginRight: 10,
      },

      viewIncoming: {
        marginLeft: 50
    },

    viewOutGoing: {
        alignItems: "flex-end",
        backgroundColor: "#FFF",
        marginRight: 0
    },

    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
});

export default styles;