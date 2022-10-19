import React from 'react'
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import MessageInput from '../components/messageInput/MessageInput';
import Message from '../components/messages/Message';
import chatRoomData from '../dummy/Chats';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ChatRoom() {
    const route = useRoute();
    const navigation = useNavigation();

    console.warn(route.params?.id);
    navigation.setOptions({title: 'Thoai'})

    return(
        <SafeAreaView style={styles.page}>

            <FlatList
            data={chatRoomData.messages}
            renderItem={({ item }) => <Message message={item}/>} 
            inverted
            />

            <MessageInput/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        flex: 1,
    }
});