import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import ChatRoomItem from '../components/chatRoomItem';
import IsActive from '../components/active/IsActive';
import chatRoomsData from '../dummy/ChatRoomData';

const chatRoom1 = chatRoomsData[3];
const chatRoom2 = chatRoomsData[1];

const Messager = () => {
  return (
    <SafeAreaView style={styles.page}>
      
        <FlatList
        data={chatRoomsData}
        renderItem={( {item} ) => <ChatRoomItem chatRoom={item}/>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <FlatList
          data={chatRoomsData}
          renderItem={( {item} ) => <IsActive chatRoom={item}/>}
          showsHorizontalScrollIndicator={false}
          horizontal/>}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Messager;
