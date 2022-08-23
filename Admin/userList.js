import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";

const UserList = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("users");

    const [id, setId] = useState("");
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");

  useEffect(() => {
    read();
  }, []);

  // read data
  const read = () => {
    dataRef
    .where('role', '==', 'Client')
      //.orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const { username } = doc.data();
        const { email } = doc.data();
        const { phone } = doc.data();
        const { address } = doc.data();

        data.push({
          id: doc.id,
          username,
          email,
          phone,
          address,
        });
      });
      setData(data);
    });
  };

  // delete data
  const destroy = (data) => {
    dataRef
      .doc(data.id)
      .delete()
      .then(() => {
        alert("Deleted Successfully!");
        console.log(" Data Deleted");
      })
      .catch((error) => {
        alert("error");
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.adminView}>
           <Text style={styles.adminText}>Viewd All Users</Text>
        </View>

        <View style={{ flex: 2, padding: 10, paddingTop: 0 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.Box}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={ styles.padd }>
                     {item.username}
                  </Text>
                  <TouchableOpacity onPress={() => destroy(item)} style={{left: 70,}}>
                    <Ionicons name="trash" color={"#ffd700"} size={30} />
                  </TouchableOpacity>
                </View>
                
                  <View style={{ padding: 10, }}>
                    <Text style={styles.text}>
                      UserID : {item.id}
                    </Text>
                    <Text style={styles.text}>
                     UserEmail : 
                      {item.email}
                    </Text>
                    
                    <Text style={[styles.text, styles.decText]}>
                      {/*Description:*/}
                      {item.phone}
                    </Text>
                    <Text style={styles.text}>
                     {item.address}
                    </Text>
                  </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
//  button: {
//    width: "100%",
//    backgroundColor: "gold",
//    width: "40%",
//    padding: 8,
//    marginLeft: 20,
//    marginRight: 30,
//    borderRadius: 5,
//    color: "#000",
//    justifyContent: "center",
//    alignItems: "center",
//    flexDirection: "row",
//  },
// 
  adminView: {
    padding: 13,
    flexDirection: "row",
  },
  adminText: {
    fontSize: 20,
    color: "white",
    ontWeight: "500",
    letterSpacing: 1,
    paddingLeft: 22,
    paddingTop: 30,
    paddingRight: 22,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    paddingBottom: 5,
    fontWeight: "500",
    letterSpacing: 1,
    width: 150,
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  padd: {
    width: 150,
    marginLeft: '22%',
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
  },
  Box: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  decText: {
    fontSize: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
  }
});
