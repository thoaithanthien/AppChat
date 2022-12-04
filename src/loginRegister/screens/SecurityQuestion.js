import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '../config/API';

const SecurityQuestion = ({navigation, route}) => {
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [CFpassword, setCFpassword] = useState('');
  const [question, setQuestion] = useState([]);
  var email = route.params.email;
  var answerQuestion = '';
  const getQuestion = () => {
    var questionAPI = BASE_URL + 'S_Question.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var data = {
      email: email,
    };

    fetch(questionAPI, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        setQuestion(response.data);
      })
      .catch(error => {
        alert('Error: ' + error);
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const confirm = () => {
    if (answer == answerQuestion) {
      alert('Câu trả lời đúng');
      navigation.navigate('UpdatePassword', {email: email});
    } else {
      alert('Câu trả lời sai');
    }
  };

  const ItemQuestion = ({item}) => {
    const itemQuestion = item.question;
    answerQuestion = item.answer;
    console.log(answerQuestion);
    return (
      <View style={styles.question}>
        <Text style={styles.textQuestion}>{`${itemQuestion}`}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{paddingHorizontal: 25}}>
          {/* <View style={{alignItems: 'center'}}>
                    <Image style={styles.img} source={require('../../assets/img/authentication.png')}/>
                </View> */}
          <Text style={styles.text}>Question Security</Text>

          {/* Forgot */}
          <FlatList
            style={styles.viewUser}
            data={question}
            renderItem={ItemQuestion}
            keyExtractor={item => `key-${item.id}`}
          />
          <View style={styles.input}>
            <MaterialIcons
              name="question-answer"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Answer"
              keyboardType="email-address"
              onChangeText={setAnswer}
              value={answer}
              style={styles.textInput}
            />
          </View>

          {/* <View style={styles.input}>
                        <Ionicons name='lock-closed-outline' size={20} color='#666'
                            style={styles.icon} />
                        <TextInput placeholder='Password'
                            onChangeText={setPassword}
                            value={password}
                            style={styles.textInput}
                            secureTextEntry={true} />
                    </View> */}

          {/* <View style={styles.input}>
                        <Ionicons name='lock-closed-outline' size={20} color='#666'
                            style={styles.icon} />
                        <TextInput placeholder='Confirm password'
                            onChangeText={setCFpassword}
                            value={CFpassword}
                            style={styles.textInput}
                            secureTextEntry={true} />
                    </View> */}

          <TouchableOpacity
            onPress={() => {
              confirm();
            }}
            style={styles.btnLogin}>
            <Text style={styles.textLogin}>Confirm</Text>
          </TouchableOpacity>

          <View style={styles.connectRegister}>
            <Text>Already registered?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.textConnectRegister}> Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.connectRegister}>
            <Text>Already registered?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.textConnectRegister}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  img: {
    width: 200,
    height: 200,
  },

  text: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },

  question: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingBottom: 8,
    marginBottom: 25,
  },

  textQuestion: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 5,
  },

  icon: {
    marginRight: 5,
  },

  textInput: {
    flex: 1,
    paddingVertical: 0,
  },

  textForgot: {
    color: '#ad40af',
    fontWeight: '700',
  },

  btnLogin: {
    backgroundColor: '#ad40af',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },

  textLogin: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },

  textConnect: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },

  connectRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textConnectRegister: {
    color: '#ad40af',
    fontWeight: '700',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 70,
  },
});

export default SecurityQuestion;
