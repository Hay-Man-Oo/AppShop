import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList ,Image,TouchableOpacity,SafeAreaView } from 'react-native';
import { firebase } from '../config'
import * as Animatable from 'react-native-animatable';

  const MenClothing = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("products")

  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [imgURL, setImageURL] = useState("");


  useEffect(() => {
      read();
  }, [])

 // read data
 const read = () => {
   dataRef
     .where('category_name', '==', 'Man')
    // .orderBy("createdAt", "desc")
     .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { imgURL } = doc.data();
      const { name } = doc.data();
      const { desc } = doc.data();
      const { price } = doc.data();
      const { qty } = doc.data();
      const { category_name } = doc.data();

      data.push({
        id: doc.id,
        imgURL,
        name,
        desc,
        price,
        qty,
        category_name,
      });
    });
    setData(data);
  });
};

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10,paddingBottom: 20  }}>
          <Text style={styles.expoView}>Shop to be Smart with WTTH</Text>
        </View>
        <SafeAreaView style={{ flex: 2, padding: 5, marginTop: -40 }}>
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
        
          >
          <FlatList
              data={data}
              keyExtractor={(_,i) => String(i)}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail", { item })}
              >
                <View style={{ padding: 10, paddingTop: 0, }}>
                <View style={{ paddingTop: 20, flexDirection: "column",}}>
                  <View>
                    <Image
                      style={styles.iimage}
                      source={{ uri: item.imgURL }}
                    />
                  </View>

                    <View>
                      <Text style={styles.expoText}>{item.category_name}</Text>
                      <Text style={styles.text}>Name : {item.name}</Text>
                      <Text style={styles.text}>Price : $ {item.price}</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            )}
            />
            </Animatable.View>
        </SafeAreaView>
      </View>
    </View>
  )
}

export default MenClothing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 20
  },
  expoText: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: "gold",
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 18,
  },
  Box: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
  },
  decText: {
    fontSize: 14,
    color: 'gold',
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
  },
  expoView: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 1,
    padding: 10
  },
  button: {
      marginTop: 10,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "#FFE89C",
      padding: 10,
      width: '100%',
      borderRadius: 20
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    letterSpacing: 1,
    paddingBottom: 15
  }
})