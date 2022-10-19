import React from 'react'
import { View , Text, Image } from 'react-native'
import styles from './styles';

export default function IsActive({ chatRoom }) {
    const user = chatRoom.users[1];
    return(
        <View style={styles.container}>
            <Image  style={styles.image} 
            source={{uri: user.imageUri}}/>
            <View style={styles.badgeContainer}/>            
            <Text  numberOfLines={1} style={styles.name}>{user.name}</Text>

        </View>
    );
}