import React from 'react'
import { StyleSheet } from 'react-native'

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
});

export default styles;