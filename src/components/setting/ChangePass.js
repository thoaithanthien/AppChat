import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const ChangePass = ({navigation}) => {
  const [CurrentPass, setCurrentPass] = React.useState('');
  const [NewPass, setNewPass] = React.useState(null);
  const [confirm, setConfirm] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.smallContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={30} style={[styles.icon]} />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Current Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCurrentPass}
            value={CurrentPass}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.textInput}>New Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewPass}
            value={NewPass}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfirm}
            value={confirm}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>UPDATE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#FFF',
  },

  smallContainer: {
    padding: 5,
  },

  containerInput: {
    marginHorizontal: 10,
    marginTop: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 30,
  },

  textInput: {
    fontWeight: '500',
    fontSize: 15,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
    fontSize: 30,
  },

  icon: {
    color: 'black',
    marginTop: 10,
    marginLeft: 5,
  },

  button: {
    backgroundColor: '#ad40af',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 40,
    marginTop: 80,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    elevation: 10,
    alignItems: 'center',
  },

  textButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});

export default ChangePass;
