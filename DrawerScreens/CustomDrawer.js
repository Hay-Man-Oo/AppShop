import React from "react";
import { View, Image, Text,TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomDrawer = props => {

  const SignOut = ({navigation}) => {
    firebase.auth().signOut()
   
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        })
   
  }
  
  return (
    
    <View style={{ flex:1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: "gold"}}
      >
      
        <Image 
          source={require('../assets/logo.png')}
          style={{height: 80, width: 80, marginLeft: 80,marginTop: 40,  marginBottom: 10,borderRadius: 40}}
        />

        <Text
          style={{marginLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
          WTTH
        </Text>
        <Text
          style={{marginLeft: 20, fontSize: 16, marginTop: 8, paddingBottom: 10}}>
          wtth@brandmail.com
        </Text>
        <View style={{flex:1, backgroundColor:"#fff", paddingTop: 10}}> 
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 15, borderTopWidth: 2, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={SignOut}
          style={{ paddingVertical: 15 }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="logout" color={"#ffd700"} size={30} />
            <Text style={{fontSize: 15, marginLeft: 15}}> Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer