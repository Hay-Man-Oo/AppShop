import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { firebase } from '../config';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')


    function onResetPasswordPress() {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    function onBackToLoginPress() {

        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <Image
                style={styles.acc}
                source={require('../assets/logo.png')}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Forgot Password?</Text>

            <TextInput style={styles.textBoxes}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#fff"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}


            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onResetPasswordPress} >
                    <Text style={styles.buttonTitle}>ResetPassword</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onBackToLoginPress}>
                    <Text style={styles.buttonTitle}>Back To Log in</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000"
    },
    textBoxes: {
        width: '90%',
        fontSize: 18,
        padding: 12,
        borderColor: 'grey',

        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        color: "#fff"
    },
    button: {
        backgroundColor: '#ffd700',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    acc: {

        height: 80,
        width: 80,
        alignSelf: "center",
        margin: 30,
        borderRadius: 20
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
});
