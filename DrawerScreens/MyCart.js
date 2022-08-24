import { StyleSheet, Text, View, TouchableOpacity, Alert ,Image} from 'react-native'
import React, { useState,useEffect } from 'react';
import { firebase } from '../config'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from "@expo/vector-icons";

const MyCart = ({ route, navigation }) => {

    //const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection('products')
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const [total, setTotal] = useState('');
      
    //Getting user id
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
    const uid = user?.id;
    const urname = user?.username;
    console.log(uid);
    console.log(urname);

      var [id] = useState('');
      var [name, setName] = useState('');
      var [imgURL, setImageURL] = useState('');
      var [desc, setDesc] = useState('');
      var [price, setPrice] = useState('');
      var [qty, setQty] = useState('');


    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        navigation.addListener("focus", () => {
            AsyncStorage.getItem("carts").then((data) => {
                if (data !== null) {
                    setCartList(JSON.parse(data)) 
                    console.log(JSON.parse(data))
                    let sum = 10;
                    JSON.parse(data).map((item) => {
                        sum += item.price * item.qty
                    })
                    console.log(sum);
                    setTotal(sum);

                }
            })
        })
    }, [])

    console.log(cartList);

    const itemDelete = async (i) => {

        if (cartList.length > 0) {
            let cart = [...cartList]
            cart.splice(i, 1)
            setCartList(cart)

            console.log(cartList.slice(-1)[0].price * cartList.slice(-1)[0].qty)
            console.log(cartList.slice(-1)[0])

            let minusPrice = cartList.slice(-1)[0].price * cartList.slice(-1)[0].qty
            let subSum = total - minusPrice;
            setTotal(subSum)

            // delete cart item
            let lastIndex = cartList.slice(-1)[0]

            await AsyncStorage.removeItem('carts')
            console.log(cart);
            console.log('successfully deleted')

        }
    }

     // Add pending Order to firebase database
     const order = () => {
        // if (uid !== null) {
         
         const cartOrder = {
             cartList,
             "total": total,
             "username": user?.username,
             "phone": user?.phone,
             "address": user?.address,  
             'createdAt':timestamp,
         };
        // console.log(cartOrder);
        firebase
            .firestore()
            .collection("orders")
            .doc("client "+urname)
            .collection("cart "+ uid )
            .doc(cartOrder.id)
            .set(cartOrder)
            .then(() => {
                console.log("Successfully order pending !!!");
                Alert.alert("Your Orders are pending. Plz wait for confirmation...")
                navigation.navigate('Products')
          });
        // }
     };
    
    const CartItemView = ({ item,index }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Text style={styles.text}>{ item.qty }</Text>
                <Image
                      style={styles.iimage}
                      source={{ uri: item.imgURL }}
                    />
                <Text style={styles.text}> {item.name} </Text>
                <Text style={styles.text}> $ {item.price} </Text>
                <TouchableOpacity
                    onPress={() => itemDelete(index)}
                    style={styles.icon}
                >
                    <Ionicons name="trash" color={"red"} size={30} />
                </TouchableOpacity>
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

            

            <View style={{ flex: 0.5 }}>
            <View >
                
                    <Text>UserID : { user?.id}</Text>
                <Text>Name : {user?.username}</Text>
                <Text>Email : {user?.email}</Text>
                <Text>Phone : {user?.phone}</Text>
                <Text>Address : {user?.address}</Text> 
                
            </View>
                <Text style={{fontSize: 20,fontWeight:'bold',color: 'gold'}}>Check Out</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                <Text>Shipping Fee</Text>
                <Text>$ 10</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                <Text>Total</Text>
                <Text>$ {total}</Text>
                </View>
                <TouchableOpacity onPress={order} style={styles.btn}>
                        <Text>Order</Text>
                    </TouchableOpacity>
            </View>

            </View>
     
    )
}

export default MyCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        paddingTop: 30,
        fontSize: 16,
        color: "#000",
        fontWeight: "500",
    },
    icon: {
        paddingTop: 20,
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
    },
    iimage: {
        width: 80,
        height: 80,
        borderRadius: 15,
      }
})

//const individualOrder = {
//    "id": id ,
//    "name": name ,
//    "imgURL": imgURL ,
//    "desc": desc ,
//    "price": price ,
//    "qty": qty ,
//  };