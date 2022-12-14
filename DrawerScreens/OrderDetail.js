import { Text, View,Image,StyleSheet,FlatList, Alert,TouchableOpacity,ScrollView } from "react-native";
import { useState,useEffect } from "react";
import { firebase } from '../config'
import { Ionicons } from "@expo/vector-icons";


export default function OrderDetail({ navigation }) {

        
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
    //const urname = firestoreDocument.data()?.username
    
    console.log(uid);
    console.log(urname);
  
  
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection('orders')

  // read data
  const read = () => {
    console.log("inside read function");
    dataRef
      .where("username",'==',"HayManOo")
      .onSnapshot((querySnapshot) => {
        const data = [];
        //console.log("Data", querySnapshot.docs.data());
        querySnapshot.forEach((doc) => {
        console.log("Data = ", doc.data());
          data.push(doc.data());
        const { userid } = doc.data();
        const { address } = doc.data();
        const { cartList } = doc.data();
          const { phone } = doc.data();
          const { status } = doc.data();
        const { total } = doc.data();
        const { username } = doc.data();
        const { createdAt } = doc.data();
        const { note } = doc.data();
          setCartList(doc.data().cartList);
       console.log("arr obj=" +cartList);
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
    console.log(" data Data = ",data);
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
  


return (
  <View style={{ flex: 1, }}>
    <Text style={{ fontSize: 30, fontWeight: 'bold', }}>OrderDetail</Text>

    <FlatList
      data={data}
      showsVerticalScrollIndicator={true}
      style={{ flex: 1, marginTop: 16 }}
      renderItem={({ item }) => (
        <View>
          
          <View style={{ flex: 0.5,borderBottomWidth: 1,borderColor:'#000',marginTop: 10 }}>
            <ScrollView>
                <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gold',textAlign:'center'  }}>{item.status}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                        <Text>ID</Text>
                        <Text>{user?.id}</Text>
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
              console.log("cart Item",cartItem)
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
       
          {/*<Text>Address: {item.address}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Total Price: {item.total}</Text>
          <Text>Name : {item.username}</Text>*/}
            </View>
          )}
      />
    </View>
  
);
}
      
    

const styles = StyleSheet.create({
  iimage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  }
})