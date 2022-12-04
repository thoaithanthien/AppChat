import { StyleSheet, 
    SafeAreaView, 
    View, 
    Text,
    Button,
    Image, 
    Keyboard,
    TextInput, 
    TouchableOpacity,
    TouchableWithoutFeedback } from 'react-native'
    import React, { useState } from 'react';
    import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons'
    import ArtDesign from 'react-native-vector-icons/AntDesign'
    import { BASE_URL } from '../../loginRegister/config/API';

    const SetQuestion = ({navigation}) => {
        
        const [question, setQuestion] = useState('');
        const [answer, setAnswer] = useState('');

        const registerQuestion = () => {
            var insertQuestionAPI = BASE_URL + 'createQuestion.php';
            var headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };

            var data = {
                question: question,
                answer: answer
            };

            fetch(insertQuestionAPI, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(response => {
                    if ((response == 'Dang ky thanh cong')) {
                        alert("Thành công")
                        navigation.navigate("Settings");
                    }

                    if(response == 'Email has Security question!'){
                        alert('Email đã có câu hỏi bảo mật');
                    }


                })
                .catch(error => {
                        alert('Error: ' + error);
                    
                });
        }
        const insertQuestion = () => {
    
            if (question.length == 0 || answer.length == 0) {
                alert("Vui lòng nhập đầy đủ thông tin")
            }    
            else { registerQuestion() }
    
            setAnswer('');
            setQuestion('');
            Keyboard.dismiss();
        }
      return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{paddingHorizontal: 25}}>
                <Text style={styles.text}>Question Security</Text>
                
                {/* Forgot */}
                <View style={styles.question}>       
                    <Text style={styles.textQuestion}>Ask your question and answer</Text>
                </View>
    
                <View style={styles.input}>
                <ArtDesign name='questioncircle' size={20} color='#666' 
                    style={styles.icon}/>
                    <TextInput placeholder='Question' 
                    keyboardType='email-address' 
                    onChangeText={setQuestion}
                    value={question}
                    style={styles.textInput}/>
                </View>
    
                <View style={styles.input}>
                <MaterialIcons name='question-answer' size={20} color='#666' 
                    style={styles.icon}/>
                    <TextInput placeholder='Answer'
                    onChangeText={setAnswer}
                    value={answer}
                    style={styles.textInput}
                    secureTextEntry={true}/>
                </View>
    
                <TouchableOpacity onPress={() => { insertQuestion() }} style={styles.btnLogin}>
                        <Text style={styles.textLogin}>Confirm</Text>
                </TouchableOpacity>
    
                <View style={styles.connectRegister}>
                    <Text>Are you?</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack()}}>
                        <Text style={styles.textConnectRegister}> Back</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.connectRegister}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Register')}}>
                        <Text style={styles.textConnectRegister}> Register</Text>
                    </TouchableOpacity>
                </View> */}
    
            </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
      )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            justifyContent: 'center'
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
            marginBottom: 25
        },

        question: {
            alignItems: 'center',
            borderBottomWidth: 1,
            borderRadius: 5,
            paddingBottom: 8,
            marginBottom: 25
        },

        textQuestion: {
            fontSize: 25,
            fontWeight: '500',
            marginTop: 5
        },
        
        icon: {
            marginRight: 5
        },
    
        textInput: {
            flex: 1,
            paddingVertical: 0,
        },
    
        textForgot: {
            color: '#ad40af',
            fontWeight: '700'
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
            marginBottom: 30
        },
    
    
        connectRegister: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
    
        textConnectRegister: {
            color: '#ad40af',
            fontWeight: '700'
        },
    
        image: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginLeft: 70,
        }
    
    });
    
    export default SetQuestion;