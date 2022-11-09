import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TextInput, TouchableOpacity, SafeAreaView } from "react-native";

const { width, height } = Dimensions.get("screen");
const Chat = ({ route }) => {
    var full_name = route.params.full_name;
    var status = route.params.status;
    var users = route.params.users;
    var unique_id = route.params.unique_id;
    // var date = route.params.date;
    // var date = "";
    var [Mess, setMess] = useState("");
    const [ListMess, setListMess] = useState([]);
    console.log(users);
    var viewMe = "";
    post = () => {
        const URL = "http://192.168.201.1:8080/users/api/messages.php"
        var Data = {
            incoming_msg_id: users,
            outgoing_msg_id: unique_id
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then((res) => res.json())
            .then((res) => {
                setListMess(res.data)

            }
            )
            .catch((error) => {
                console.log('Error: ', error)
            })
    };

    useEffect(() => {
        post()
        return () => {

        };
    }, [])

    sendMessages = () => {
        const URL = "http://192.168.201.1:8080/users/api/createRoom.php"
        var Data = {
            incoming_msg_id: users,
            outgoing_msg_id: unique_id,
            msg: Mess,
            // date: date
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then((res) => res.json())
            .catch((error) => {
                console.log('Error: ', error)
            })

    };

    const ItemList = ({ item }) => {
        var msg = item.msg;
        var date = item.date;
        var outgoing_msg_id = item.outgoing_msg_id;
        if (outgoing_msg_id == users) {
            viewMe = styles.viewOutGoing;
        } else {
            viewMe = styles.viewIncoming;
        }

        return (
            <View>
                <View style={[viewMe, { marginTop: 10 }]}>
                    <Text>{`${msg}`}</Text>
                    <Text>{`${date}`}</Text>
                </View>
            </View>
        )
    }

    return (
        //header
        <SafeAreaView>
            <FlatList
                style={styles.viewFl}
                data={ListMess}
                renderItem={ItemList}
                keyExtractor={item => `key-${item.room_id}`}
            />

            <TextInput
                onChangeText={setMess}
                value={Mess}
                placeholder="write something"
            />
            <TouchableOpacity onPress={() => {
                sendMessages()
            }}>
                <Text>Send</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },

    viewFl: {
        height: 500
    },

    viewIncoming: {
        marginLeft: 50
    },

    viewOutGoing: {
        alignItems: "flex-end",
        backgroundColor: "#FFF",
        marginRight: 0
    }
})
export default Chat;