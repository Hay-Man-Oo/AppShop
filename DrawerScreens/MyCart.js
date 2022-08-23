import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState,useEffect } from 'react';
import { firebase } from '../config'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MyCart = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection('orders')
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [total, setTotal] = useState('');
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.firestore().collection("users")
            .doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])

    const add = () => {
        if (name && name.length > 0 || price && price.length > 0 || total && total.length > 0 || address && address.length > 0 ||  phone && phone.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();

            const data = {
                name: user?.id,
                price: user?.id,
                phone: user?.phone,
                address: address,
                total: parseFloat(total),
                createdAt: timestamp
            };
            dataRef
                .add(data)
                .then(() => {
                    setName('')
                    setPrice('')
                    setPhone('')
                    setAddress('')
                    setTotal('')
                })
                .then(() => {
                    Alert.alert('Your Order Successfully Arrived')
                    navigation.navigate('Products')
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }


    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        navigation.addListener("focus", () => {
            AsyncStorage.getItem("carts").then((data) => {
                if (data !== null) {
                    setCartList(JSON.parse(data)) 
                    console.log(JSON.parse(data))
                    let sum = 0;
                    JSON.parse(data).map((item) => {
                        sum += item.price * 1
                    })
                    console.log(sum);
                    setTotal(sum);
                }
            })
        })
    }, [])

    const removeItemValue= async (item, index) => {
        let value1 = await AsyncStorage.getItem('carts');
        value1 =JSON.parse(value1);
        console.log("value1"+data)
        //value = item.splice(index,1)
        if (value1 !== null){
            //var index = value.indexOf(x => x.Title === item.Title);
            if (index > -1){
            value1.splice(index, 1);
            await AsyncStorage.removeItem('carts');
            
            AsyncStorage.setItem('carts',JSON.stringify(data)); 
            
        }
        }    
    }

    //removeItemValue = async(index) => { // don't need item here
    //    // avoid mutations, create new variables
    //    const rawValue = await AsyncStorage.getItem('carts');
    //    try {
    //      const jsonValue = JSON.parse(rawValue) || []; // avoid undefined or null
    //      const finalValue = [...jsonValue.slice(0, index), ...jsonValue.slice(index + 1)];
    //      await AsyncStorage.setItem('carts', JSON.stringify(finalValue)); // add await here
    //    } catch (e) {
    //      console.log('Parsing failed', e)
    //    }
    //  }

//    const Delete = async () => {
//        await AsyncStorage.getItem("cart").then((data) => {
//            if (data !== null) {
//                setCartList(JSON.parse(data))
//            }
//        })
//
//        const itemIndex = JSON.parse(data).map((item) => item.name).indexOf(item.name);
//
//        if (itemIndex !== -1) {
//            setCartList.splice(itemIndex, 1);
//
//            await AsyncStorage.setItem("carts", JSON.stringify(setCartList));
//        }
//    }   

//    const itemDelete = (i) => {
//        if (cartList.length > 0) {
//            let cart = [...cartList]
//            cart.splice(i, 1)
//            setCartList(cart)
//        }
//    }
//
//    const DeleteAllFinishedTasks = async() => {
//        await AsyncStorage.removeItem('carts');
//        console.log("clear")
//    }

    //const removeItemValue = async() => {
    //    try {
    //        await AsyncStorage.removeItem('carts');
    //        navigation.navigate('Products')
    //        return true;
    //    }
    //    catch(exception) {
    //        return false;
    //    }
    //}

    const CartItemView = ({ item,index }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                {/*<Text>{ item.id }</Text>*/}
                <Text> { item.name } </Text>
                <Text> {item.price} </Text>
                <TouchableOpacity
                    onPress={
                        () => removeItemValue(index)
                        //DeleteAllFinishedTasks
                    }
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity
                    onPress={
                        Delete
                        //DeleteAllFinishedTasks
                    }
                >
                    <Text>Delete</Text>
                </TouchableOpacity>*/}
            </View>
        )
    }

    return (
  
        <View style={styles.container}>
            <Text style={{fontSize: 20,textAlign: 'center'}}>
                Order Details
            </Text>
            <FlatList
                        data={cartList}
                        renderItem={CartItemView}
                        showsVerticalScrollIndicator={true}
                        style={{ flex: 1, marginTop: 16 }}
            />
            <View style={{flex: 2,}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                    <Text>Total</Text>
                    <Text>{total}</Text>
                </View>

                <TextInput
                    style={styles.inputAddress}
                    placeholder={ user?.address}
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                />
                <Text>UserID : { user?.id}</Text>
                <Text>Name : {user?.username}</Text>
                <Text>Email : {user?.email}</Text>
                <Text>Phone : {user?.phone}</Text>
            </View>
           
            <View style={styles.btn}>
                    <TouchableOpacity onPress={add}>
                        <Text>Order</Text>
                    </TouchableOpacity>
            </View>
            {/*<View style={styles.btn}>
                    <TouchableOpacity onPress={removeItemValue}>
                        <Text>ClearCart</Text>
                    </TouchableOpacity>
            </View>*/}
            </View>
     
    )
}

export default MyCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    },
    inputAddress: {
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    },

    btn: {
      marginBottom: 10,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "#FFE89C",
      padding: 10,
      width: '100%',
      borderRadius: 20
    }
})