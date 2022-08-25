import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";
//import { useIsFocused } from '@react-navigation/native';//
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../config";

const confirm = ({ route, navigation }) => { 

  const [status, setStatus] = useState(route.params.item.status)
  
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection('orders')

//  function productUpdate() {
//    //Update User Added
//    updateDoc(doc(db, "orders",route.params.item.data.id), {
//      status : status
//    }).then(() => {
//      // Data Saved Successfully!
//      console.log(status);
//
//    }).catch((error) => {
//      //The Write Failed....
//      console.log(error);
//    });
//}

  
  const update = async () => { 
    dataRef
        .doc(route.params.item.data.id)
        .update({
          status : status
        })
        .then(() => {
          navigation.goBack("UserOrder");
          Alert.alert("Updated Successfully!");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  
return (
  <View style={{ flex: 1, }}>
    <TouchableOpacity style={styles.button} onPress={update}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Confirm</Text>
    </TouchableOpacity>
                    <TextInput
                            style={styles.textBoxes}
                            placeholder='statusUpdate'
                            onChangeText={(status) => setStatus(status)}
                            placeholderTextColor="#c4c4c2"
                        />
    </View>
    );
}
export default confirm

const styles = StyleSheet.create({
  adminText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 20,
    textAlign: 'center',
  },
  textBoxes: {
    width: '60%',
    marginLeft: 20,
    fontSize: 16,
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "black"
},
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 5,
    paddingTop: 10
  },
  padd: {
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
  },
  Box: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
    padding : 10
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  decText: {
    fontSize: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
});