import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
// import { API } from '../../constant/API';

const Home = ({navigation}) => {
  const [DataList, setDataList] = useState([]);
  const [DataUser, setDataUser] = useState([]);
  var user_id = '';
  const ItemList = ({item}) => {
    var unique_id = item.unique_id;
    var username = item.username;
    // var date = item.date;
    // var status = item.status;
    return (
      <View>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.navigate('ChatRoom', {
              unique_id: unique_id,
              username: username,
              // status: status,
              users: user_id,
            });
          }}>
          <View style={{}}>
            <Text>============</Text>
          </View>
          <View style={{}}>
            <Text style={{fontSize: 20}}>{`${unique_id}`}</Text>
            <Text style={{fontSize: 20}}>{`${username}`}</Text>
            <Text style={{fontSize: 20}}>{`${item.email}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemUser = ({item}) => {
    user_id = item.unique_id;
    var email = item.email;
    var password = item.password;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
            }}
          />
        </TouchableOpacity>
        {/* <View style={styles.item}>
                    <Text style={styles.title}>{`${user_id}`}</Text>
                    <Text style={styles.title}>{`${email}`}</Text>
                </View> */}
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>ID: </Text>
            <Text style={styles.name}>{`${user_id}`}</Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>{`${email}`}</Text>
          <Text numberOfLines={1} style={[styles.text, styles.isOnline]}>
            Active Now
          </Text>
        </View>
      </View>
    );
  };
  // useEffect(() => {
  //     getList();

  // }, []);

  useEffect(() => {
    getUser();
  }, []);
  // getList = () => {
  //     const URL = "http://192.168.201.1:8080/users/api/homeChat.php"
  //     fetch(URL)
  //         .then((res) => res.json())
  //         .then((resJson) => {
  //             setDataList(resJson.data)
  //         }).catch((error) => {
  //             console.log('Error: ', error)
  //         })
  // };

  getUser = () => {
    const URL = 'http://192.168.201.1:8080/users/api/user.php';
    fetch(URL)
      .then(res => res.json())
      .then(resJson => {
        setDataUser(resJson.data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <FlatList
          style={styles.viewUser}
          data={DataUser}
          renderItem={ItemUser}
          keyExtractor={item => `key-${item.unique_id}`}
        />
      </TouchableOpacity>
      {/* <FlatList
                data={DataList}
                renderItem={ItemList}
                keyExtractor={item => `key-${item.unique_id}`}
            /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  viewUser: {
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },

  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
  },

  isOnline: {
    color: '#16D0FE',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  text: {
    color: 'grey',
  },
});

export default Home;
