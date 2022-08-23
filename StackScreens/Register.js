import { ActivityIndicator, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firebase } from '../config'
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setName] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }
    const onRegisterPress = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    role: 'Client',
                    username,
                    phone,
                    address,
                    createdAt:timestamp,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home')
                    })
                    .catch((error) => {
                        con(error)
                        Alert.alert("Your email has not sign in yet!")
                    });

            })
            .catch((error) => {
                alert(error)
            });

    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>Sign Up</Text>

                <Image
                    style={styles.acc}
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    placeholderTextColor="#fff"
                    value={username}
                    onChangeText={(text) => setName(text)}
                    placeholder='Enter Your Name'
                    style={styles.textBoxes} >

                </TextInput>


                <TextInput
                    value={email}
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Email Address'
                    autoCapitalize="none"
                    keyboardType={'email-address'}
                    style={styles.textBoxes}
                >

                </TextInput>

                <TextInput
                    value={phone}
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setphone(text)}
                    placeholder='Enter Phone Number'
                    style={styles.textBoxes}
                    keyboardType={'phone-pad'}
                >

                </TextInput>

                <TextInput
                    value={address}
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setaddress(text)}
                    placeholder='Enter Your Address'
                    style={styles.textBoxes}
                >

                </TextInput>

                <TextInput
                    value={password}
                    placeholderTextColor="#fff"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.textBoxes} >

                </TextInput>


                <TextInput
                    placeholderTextColor="#fff"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    style={styles.textBoxes}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 30, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>Already got an account? <Text onPress={onFooterLinkPress} style={{ color: "#ffd700", fontSize: 20, fontWeight: "bold" }}>Log in</Text></Text>
                </View>

            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
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
        padding: 5,
        backgroundColor: '#ffd700',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },
});

