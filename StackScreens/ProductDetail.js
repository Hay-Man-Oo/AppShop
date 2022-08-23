import { StyleSheet, Text, View, Image,TouchableOpacity,Alert} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { firebase } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetail = ({ route, navigation }) => {
  const dataRef = firebase.firestore().collection("products");

  var [id] = useState(route.params.item.id);
  var [name, setName] = useState(route.params.item.name);
  var [imgURL, setImageURL] = useState(route.params.item.imgURL);
  var [desc, setDesc] = useState(route.params.item.desc);
  var [price, setPrice] = useState(route.params.item.price);
  var [qty, setQty] = useState(route.params.item.qty);


  const addToCart = () => { 
    AsyncStorage.getItem("carts").then((data) => {
        if (data == null) {
            let cartItem = [{
                id: id,
                name: name,
                imgURL: imgURL,
                desc: desc,
                price: price,
                qty: count
            }]
            AsyncStorage.setItem("carts", JSON.stringify(cartItem))
        } else {
            let datas = JSON.parse(data);                    
            let cartItem = [{
              id:
                //datas[datas.length - 1].
                  id + 1,
                name: name,
                imgURL: imgURL,
                desc: desc,
                price: price,
                qty: count
            }]
            AsyncStorage.setItem("carts", JSON.stringify([...datas, ...cartItem])).then(() => {
                Alert.alert("Your Product have successfully added to cart.")
                navigation.navigate('MyCart')
            })
        }
    })
}

const [count, setCount] = useState(1);

const increase = (item) => {
 setCount(count + 1)
} 

const decrease = (item) => {
  if (count <= 0) {
    count === 0;
    navigation.navigate('ProductDetail', {item})
  } else {
    setCount(count - 1);
  }
}
  
  return (
    <View style={styles.container}>
      <Image style={styles.iimage} source={{ uri: imgURL }} />
      <View>
        <Text style={styles.text}>ID : {id}</Text>
        <Text style={styles.text}>Name : {name}</Text>
        <Text style={styles.text}>Price : $ {price}</Text>
        <View style={{ flexDirection: 'row',}}>
        <Text style={styles.text}>Qty : </Text>
          <View style={{padding: 8}}>
          <MaterialCommunityIcons name="minus" size={20} color={'gold'}
            onPress={decrease} />
          </View>
          <Text style={styles.text}>{count}</Text>
          <View style={{padding: 8}}>
          <MaterialCommunityIcons name="plus" size={20} color={'gold'}
            onPress={increase} />
          </View>
        </View>
        <Text style={styles.text}>Description : {desc}</Text>
        <View style={{marginTop: 40}}>
          <TouchableOpacity
            style={styles.button}
            onPress={addToCart}
          >
            <Text style={{fontSize: 16,color:'#444',fontWeight:'bold'}}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    //alignItems: "center",
    justifyContent: 'flex-start',
  },
  iimage: {
    width: 350,
    height: 350,
    borderRadius: 20,
    margin: 5
  },
  expoView: {
    fontSize: 24,
    color: "gold",
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: 5,
  },
  button: {
    //marginTop: 10,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#FFE89C",
    padding: 15,
    width: '100%',
    borderRadius: 30
},
  text: {
    //marginTop: 10,
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
    letterSpacing: 1,
    padding: 10
  },
});

