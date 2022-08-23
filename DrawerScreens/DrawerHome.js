import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function DrawerHome( { navigation } ) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "space-between",}}>
      <Text style={styles.label1}>New Arrivals</Text>
      {/*<Image source={require("../assets/logo.png")} style={styles.imgLogo} />*/}
      </View>
      <ScrollView style={{ flex: 0.5, margin: 3 }}>
        <View>
          <ScrollView horizontal={true} style={styles.shadow}>
            <Image source={require("../assets/acce1.jpg")} style={styles.img1} />
            <Image source={require("../assets/shoe1.jpg")} style={styles.img1} />
            <Image source={require("../assets/men2.jpg")} style={styles.img1} />
            <Image source={require("../assets/women1.jpg")} style={styles.img1} />
          </ScrollView>
        </View>
      
          <Text style={styles.label2}> Shop today or Cry later..</Text>

        <View style={[styles.row, styles.shadow]}>
          <Image source={require("../assets/img3.png")} style={styles.img2} />
          <TouchableOpacity
            style={[styles.bottom]}
            onPress={() => navigation.navigate("Men")}
          >
            <Text style={styles.Bot1}> Men </Text>
            <Text style={styles.Bot1}>Clothes</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.shadow]}>
          <TouchableOpacity
            style={styles.bottom}
            onPress={() => navigation.navigate("Woman")}
          >
            <Text style={styles.Bot1}> Women </Text>
            <Text style={styles.Bot1}>Clothes</Text>
          </TouchableOpacity>
          <Image source={require("../assets/img3.png")} style={styles.img2} />
        </View>

        <View style={[styles.row, styles.shadow]}>
          <Image source={require("../assets/shoe2.webp")} style={styles.img2} />
          <TouchableOpacity onPress={() => navigation.navigate("Shoes")}>
            <Text style={styles.Bot2}>Shoes</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.shadow]}>
          <TouchableOpacity onPress={() => navigation.navigate("Accessory")}>
            <Text style={styles.Bot2}>Accessories</Text>
          </TouchableOpacity>
          <Image source={require("../assets/img6.png")} style={styles.Accimg} />
        </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //#2b2b20
    backgroundColor: "#000",
    //alignItems: "center",
    //justifyContent: "center",
  },
  shadow: {
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.8,
    elevation: 15,
  },
  imgLogo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  img1: {
    width: 190,
    height: 290,
    margin: 10,
    borderWidth: 1,
    borderColor: "#fff",
    resizeMode: "stretch",
    borderRadius: 10
  },
  img2: {
    width: "73%",
    height: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10
  },
  Accimg: {
    width: "68%",
    height: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10
  },
  label1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gold",
    padding: 10,
  },
  label2: {
    fontSize: 15,
    //fontWeight: "bold",
    color: "gold",
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  bottom: {
    borderWidth: 1,
    borderColor: "gold",
    marginTop: 30,
    marginBottom: 35,
    borderRadius: 5,
  },
  Bot1: {
    fontSize: 15,
    color: "white",
    padding: 5,
    paddingBottom: 0,
  },
  Bot2: {
    borderWidth: 1,
    borderColor: "gold",
    marginTop: 50,
    borderRadius: 5,
    padding: 5,
    fontSize: 15,
    color: "#fff",
    marginBottom: 15,
  },
});
