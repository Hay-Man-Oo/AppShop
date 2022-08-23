import React, { useEffect, useState } from 'react'
import { TextInput, FlatList, Text, View, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import { firebase } from '../config'
import { CommonActions } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function AccountScreen({ route, navigation }, props) {
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    //const [username, setUsername] = useState('');
    //const [phone, setphone] = useState("");
    //const [address, setaddress] = useState("");
    //const [newPassword, setnewPassword] = useState("");
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    function Edit() {
        navigation.navigate('EditProfile')
    }

    useEffect(() => {
        firebase.firestore().collection("users")
            .doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])
    useEffect(() => {
        if (user)
            firebase.firestore().collection("users").where("role", "==", (user?.role === "Admin" ? "Admin" : "Client"))
                .onSnapshot(users => {
                    if (!users.empty) {
                        const USERS = []
                        users.forEach(user => {
                            USERS.push(user.data())
                        })

                        setUsers(USERS)
                    }

                })
    }, [user])
    const signOut = () => {
        firebase.auth().signOut()
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>


                <Image
                    style={styles.acc}
                    source={require('../assets/logo.png')}
                />
                <View style={{ paddingBottom: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#ffd700" }}>Your Profile</Text>
                </View>
                <View style={{ padding: 15, borderWidth: 2, borderColor: "#ffd700" }}>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#ffd700" }}>Name    :   {user?.username}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#ffd700" }}>Email     :   {user?.email}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#ffd700" }}>Phone    :   {user?.phone}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#ffd700" }}>Address :    {user?.address}</Text>
                </View>


                <View style={{ paddingTop: 50, flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={Edit}
                        style={styles.button}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={signOut}
                        style={styles.button}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>



    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,


        backgroundColor: "#000"
    },
    textBoxes: {
        width: '90%',
        fontSize: 16,
        padding: 10,
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
        marginTop: 5,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        padding: 10,
        justifyContent: 'center'
    },

    acc: {
        height: 80,
        width: 80,
        alignSelf: "center",
        margin: 30,
        borderRadius: 50
    },
})
