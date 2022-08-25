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

const UserOrder = ({ route, navigation }) => {

  //const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection('orders')

  const [status, setStatus] = useState('');
  // read data
  const read = () => {
    console.log("inside read function");
    dataRef
      .onSnapshot((querySnapshot) => {
        const data = [];
        //console.log("Data", querySnapshot.docs.data());
        querySnapshot.forEach((doc) => {
          //console.log("Data = ", doc.data());
          //console.log("orderId" ,doc.id)
          data.push(doc.data());
          data.id = doc.id;
          const { userid } = doc.data();
          const { address } = doc.data();
          const { cartList } = doc.data();
          const { phone } = doc.data();
          const { total } = doc.data();
          const { username } = doc.data();
          const { status } = doc.data();
          const { note } = doc.data();
          //id : doc.id,
          setCartList(doc.data().cartList);
          //console.log("arr obj=" + cartList);
          //data.push({
          //  id: doc.id,
          //  address,
          //  cartList,
          //  phone,
          //  total,
          //  username,
          //});
        });
        setData(data);
      });
    //console.log(" data Data = ", data);
    console.log("order" , data.id)
  };
  useEffect(() => {
    read();
  }, []);

  //// delete data
  //const destroy = (data) => {
  //  dataRef
  //    .doc(data.id)
  //    .delete()
  //    .then(() => {
  //      alert("Deleted Successfully!");
  //      console.log(" Data Deleted");
  //    })
  //    .catch((error) => {
  //      alert("error");
  //    });
  //};

  //const update = async () => {
  //  console.log(doc.id)
  //if (
  //  (status && status.length > 0)
  //) 
  //  dataRef
  //    .doc(doc.id)
  //    .update({
  //      status: status,
  //    })
  //    .then(() => {
  //      //navigation.goBack("Admin");
  //      Alert.alert("Status Update Successfully!");
  //    })
  //    .catch((error) => {
  //      alert(error.message);
  //    });
  //}
  //function productUpdate() {
  //      //Update User Added
  //      updateDoc(doc(db, "orders",data.id), {
  //        status : status
  //      }).then(() => {
  //        // Data Saved Successfully!
  //        console.log(status);
  //        console.log(data.id)
  //  
  //      }).catch((error) => {
  //        //The Write Failed....
  //        console.log(error);
  //      });
  //}
  
//  const StatusUpdate = async () => {
//    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//    const data = {
//        id: user.id,
//        username: username,
//        updatedAt:timestamp,
//    }
//    const userRef = firebase.firestore().collection('users').doc(user.id)
//    userRef.update(data)
//
//    Alert.alert('User has been Updated!')
//    //  navigation.dispatch(
//    //      CommonActions.reset({
//    //          index: 0,
//    //          routes: [{ name: 'Home' }]
//    //      })
//    //  )
//
//}


//  const [showBox, setShowBox] = useState(true);
//
//  const showConfirmDialog = () => {
//    return Alert.alert(
//      "Are your sure?",
//      "Are you sure you want to remove this beautiful box?",
//      [
//        // The "Yes" button
//        {
//          text: "Yes",
//          onPress: () => {
//            setShowBox(false);
//            Alert.alert('User Order Have Confirmed!')
//            setStatus('confirmed')
//          },
//        },
//        // The "No" button
//        // Does nothing but dismiss the dialog when tapped
//        //{
//        //  text: "No",
//        //  onPress:()=> {destroy}
//        //},
//      ]
//    );
//  };

  return (
    <View style={{ flex: 1, }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', }}>OrderDetail</Text>
  
      <FlatList
        data={data}
        showsVerticalScrollIndicator={true}
        style={{ flex: 1, marginTop: 16 }}
        renderItem={({ item }) => (
          <View>
            {/*<TouchableOpacity onPress={showConfirmDialog}>*/}
            <View style={{ borderBottomWidth: 1,borderColor:'#000',marginTop: 10 }}>
              <ScrollView>
                <View>
                {/*<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gold',textAlign:'center' }}>{data.id}</Text>*/}
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gold',textAlign:'center' }}>{item.status}</Text>
                  <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('orderConfirm', { item })}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Confirm</Text>
                    </TouchableOpacity>
                    {/*<TextInput
                            style={styles.textBoxes}
                            placeholder='statusUpdate'
                            onChangeText={(status) => setStatus(status)}
                            placeholderTextColor="#c4c4c2"
                        />*/}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <Text>ID</Text>
                        <Text>{item.userid}</Text>
                    </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Name</Text>
                          <Text>{item.username}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Phone</Text>
                          <Text>{item.phone}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Address</Text>
                          <Text>{item.address}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                        <Text>Note</Text>
                        <Text>{item.note}</Text>
                    </View>
                  </View>
                      {/*<Text style={{fontSize: 20,fontWeight:'bold',color: 'gold'}}>Check Out</Text>*/}
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Shipping Tax</Text>
                          <Text>$ 10</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Total</Text>
                          <Text>$ {item.total}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                        <Text>Order Date</Text>
                        <Text> {new Date(item.createdAt.seconds * 1000).toLocaleDateString("en-US")}</Text>
                    </View>
              </ScrollView>
              
                {
                  item.cartList.map((cartItem) => {
                    //console.log("cart Item",cartItem)
                    return (
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                      <Text>{cartItem.qty} x</Text>
                        <Text>{cartItem.name}</Text>
                        <Text>$ {cartItem.price}</Text>
                    </View>
                    )
                  }
                  )
                }
  
            </View>
            {/*</TouchableOpacity> */}
          </View>
            )}
        />
      </View>
    
  );
}
export default UserOrder;

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
