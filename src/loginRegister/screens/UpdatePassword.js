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
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updatePassword} from '../config/APIReset';

const Register = ({navigation, route}) => {
  var email = route.params.email;
  // console.log(email);
  // const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [CFpassword, setCFpassword] = useState('');

  const insert = () => {
    // navigation.navigate('Security');
    if (password.length == 0 || CFpassword.length == 0) {
      alert('Vui lòng nhập đầy đủ thông tin');
    } else if (password !== CFpassword) {
      alert('Mật khẩu không giống nhau');
    } else {
      updatePassword(email, password, navigation);
    }

    setPassword('');
    setCFpassword('');
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{paddingHorizontal: 25}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.img}
              source={require('../../assets/img/authentication.png')}
            />
          </View>
          <Text style={styles.text}>Update Password</Text>

          {/* Forgot */}

          {/* <View style={styles.input}>
                    <MaterialIcons name='alternate-email' size={20} color='#666' 
                    style={styles.icon}/> 
                    <TextInput placeholder='Email ID' 
                    keyboardType='email-address' 
                    onChangeText={setEmail}
                    value={email}
                    style={styles.textInput}/>
                </View> */}

          <View style={styles.input}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              style={styles.textInput}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.input}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Confirm password"
              onChangeText={setCFpassword}
              value={CFpassword}
              style={styles.textInput}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              insert();
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

export default Register;
