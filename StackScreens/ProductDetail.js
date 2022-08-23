import { StyleSheet, Text, View, Image,TouchableOpacity,Alert} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { firebase } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                qty: qty
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
                qty: qty
            }]
            AsyncStorage.setItem("carts", JSON.stringify([...datas, ...cartItem])).then(() => {
                Alert.alert("Your Product have successfully added to cart.")
                navigation.navigate('MyCart')
            })
        }
    })
}

  //var [id] = useState(route.params.res.id)
  //var [name, setName] = useState(route.params.res.name);
  //var [desc, setDesc] = useState(route.params.res.desc);
  //var [price, setPrice] = useState(route.params.res.price);
  //var [qty, setQty] = useState(route.params.res.qty);
  //var [category, setCategory] = useState(route.params.res.category);
  return (
    <View style={styles.container}>
      {/*<Text style={styles.expoView}>ProductDetail</Text>*/}
      <Image style={styles.iimage} source={{ uri: imgURL }} />
      <View>
        <Text style={styles.text}>ID : {id}</Text>
        <Text style={styles.text}>Name : {name}</Text>
        <Text style={styles.text}>Price : $ {price}</Text>
        <Text style={styles.text}>Quantity : {qty}</Text>
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

