import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList ,Image,TouchableOpacity,SafeAreaView,ImageBackground } from 'react-native';
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
      <ImageBackground
                source={require('../assets/bg6.jpg')}
                style={{width: '100%', height: "100%",}}
            > 
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
                <View style={{ padding: 10, paddingTop: 10, }}>
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
        </ImageBackground>
    </View>
  )
}

export default MenClothing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  expoView: {
    fontSize: 26,
    color: 'gold',
    fontWeight: '500',
    letterSpacing: 1,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    letterSpacing: 1,
    paddingBottom: 15
  }
})