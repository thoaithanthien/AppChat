import { StyleSheet, View, Text, TouchableOpacity, Image, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {BASE_URL} from '../loginRegister/config/API';

const Friend = () => {

  const [dataList, setDataList] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getUser();
    
  }, []);

  
  useEffect(() => {
    getList();
    
  }, []);

  getUser = () => {
    const URL = BASE_URL + "user.php"
    fetch(URL)
        .then((res) => res.json())
        .then((resJson) => {
            setDataUser(resJson.data)
        }).catch((error) => {
            console.log('Error: ', error)
        })
};

  getList = () => {
    const URL = BASE_URL + "homeFriends.php"
    fetch(URL)
        .then((res) => res.json())
        .then((resJson) => {
            setDataList(resJson.data)
        }).catch((error) => {
            console.log('Error: ', error)
        })
};


  const ItemUser = ({item}) => {
    user_id = item.unique_id;

  };
  
  const ItemList = ({item}) => {
    var unique_id = item.unique_id;
    var email = item.email;
    // var unique_id = item.unique_id;

    return(
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.rowMain}>
        <Image  style={styles.image} 
        source={{ uri: 'https://i.pinimg.com/736x/99/8b/76/998b76aa2e21e43e25970bb72bfeda98.jpg'}}/>

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>ID: </Text>
            <Text style={styles.name}>{`${unique_id}`}</Text>
          </View>
            <Text numberOfLines={1} style={styles.text}>{`${email}`}</Text>
            <Text numberOfLines={1} style={[styles.text, styles.isOnline]}>Active Now</Text>
        </View>

        <TouchableOpacity style={styles.btnAccept} onPress={() => {
              navigation.goBack();
        }}>
            <Button title="Accept" size={30} style={styles.iconAccept}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDelete} onPress={() => {
              navigation.goBack();
        }}>
          <Button title="Delete" size={30} style={styles.iconDelete}/>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
    );
    }


    return (
      <View>
        <TouchableOpacity onPress={() => { }}>
                <FlatList
                    style={styles.viewUser}
                    data={dataUser}
                    renderItem={ItemUser}
                    keyExtractor={item => `key-${item.unique_id}`}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }}>
                <FlatList
                    style={styles.viewUser}
                    data={dataList}
                    renderItem={ItemList}
                    keyExtractor={item => `key-${item.unique_id}`}/>
        </TouchableOpacity>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 

  rowMain: {
    flexDirection: 'row',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  rightContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  row: {  
    flexDirection: 'row',
  },

  isOnline: {
    color: '#16D0FE'
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  text: {
    color: 'grey',
  },

  iconAccept: {
    marginRight: 8,
  },

  iconDelete: {
    marginRight: 8,
  },

  btnAccept: {
    marginRight: 8,
  },

  btnDelete: {
    marginRight: 8,
  }
});

export default Friend