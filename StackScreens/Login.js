import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, ImageBackground } from 'react-native';
import { firebase } from '../config'
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function register() {
        navigation.navigate('Register')
    }
    function forgotPassword() {
        navigation.navigate("ForgotPassword")
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        //console.log("firebase Data:",firestoreDocument.data())

                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        } else {
                            const userrole = firestoreDocument.data()?.role
                            //console.log(userrole)
                            if (userrole == "Admin") {
                                navigation.navigate("AdminHome")
                            } else
                                navigation.navigate("Home")


                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
            })

            .catch(error => {
                alert(error)
            })

    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/bg.jpg')}
                style={{width: '100%', height: "100%",}}
            > 
                <View style={{ flex: 1, marginLeft: 200, }}>
                
                <Text style={{ fontSize: 40,   paddingLeft: 40,marginTop: 90, fontWeight: "900", color: "#000" }}>WTTH</Text>
                <Image
                    style={{height: 100,
                            width: 100,
                        marginLeft: 55,
                        marginTop: 45,
                        borderRadius: 50}}
                    source={require('../assets/logo.png')}
                />
                </View>
               
            <View style={styles.con}>

                    <Text style={{
                        fontSize: 28, fontWeight: "bold", color: "#fff",   marginBottom: 20,  marginLeft: 10,
                    }}>LOG IN</Text>
   
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Email Address'
                    style={styles.textBoxes}
                    keyboardType={'email-address'}
                    placeholderTextColor="#c4c4c2"
                />

                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.textBoxes}
                    secureTextEntry
                    placeholderTextColor="#c4c4c2" />


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 30, marginLeft: 10, }} onPress={forgotPassword}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Forgot Password</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: 20, marginLeft: 10, }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>Don't have an account? <Text style={{ color: "#f7d081", fontSize: 20, fontWeight: "bold" }}
                        onPress={register}>Sign up</Text></Text>
                </View>

                </View>
                </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 

    },
    con: {
        flex: 1.5,
        margin: 10,
       marginTop: -50,
    },
    textBoxes: {
        width: '65%',
        fontSize: 18,
        padding: 10,
        borderColor: 'white',
        borderBottomWidth: 2,
        color: '#fff',
        borderRadius: 10,
        paddingTop: 30,
        marginBottom: 10
    },
    acc: {
        width: '100%', height: 200,
        height: 80,
        width: 80,
        alignSelf: "center",
        //marginTop: 150,
        borderRadius: 50
    },
    button: {
        backgroundColor: '#f7d081',
        width: 100,
        marginLeft: 10,
        marginTop: 30,
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        justifyContent: 'center'
    },
    buttonTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: "bold",

    },
});
