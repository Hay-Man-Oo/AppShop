import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from 'react-native';
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
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.con}>

                <Text style={{ fontSize: 28, fontWeight: "bold" }}>LOG IN</Text>
                <Image
                    style={styles.acc}
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Email Address'
                    style={styles.textBoxes}
                    keyboardType={'email-address'}
                    placeholderTextColor="#fff"
                />

                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.textBoxes}
                    secureTextEntry
                    placeholderTextColor="#fff" />


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={forgotPassword}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Forgot Password</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>Don't have an account? <Text style={{ color: "#ffd700", fontSize: 20, fontWeight: "bold" }}
                        onPress={register}>Sign up</Text></Text>
                </View>

            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',

        paddingTop: 100
    },
    con: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBoxes: {
        width: '90%',
        fontSize: 18,
        padding: 12,
        borderColor: 'grey',
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        color: "#fff",
        marginBottom: 10
    },
    acc: {

        height: 80,
        width: 80,
        alignSelf: "center",
        margin: 30,
        borderRadius: 50
    },
    button: {
        backgroundColor: '#ffd700',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        padding: 15,
        borderRadius: 15,
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
