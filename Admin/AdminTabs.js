import  React from 'react';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AdminHome from './AdminHome';
import OrderDetail from '../DrawerScreens/OrderDetail';
import UserList from './userList';
import { firebase } from '../config';
import { CommonActions } from '@react-navigation/native';

export default function AdminTab({ navigation }) {
  const Tab = createBottomTabNavigator();

  const SignOut = () => {
    firebase.auth().signOut()
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        })
    )
}
  return (
    <Tab.Navigator
      initialRouteName="Admin"
      screenOptions={{
        headerShown: false,
        //tabBarIconStyle: { display: 'none' },
        //tabBarStyle: {
        //  paddingBottom: 20
        //},
        tabBarLabelStyle: {
          fontSize: 12
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="feather" color={'#ffd700'} size={30} />
        ),
        
      }}
    >
      <Tab.Screen
        name="Admin"
        component={AdminHome}
      />
      <Tab.Screen
        name="OrderList"
        component={OrderDetail}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={'#ffd700'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="UserList"
        component={UserList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={'#ffd700'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={SignOut}
        options={{
          //tabBarLabel: 'SignOut',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="exit" color={'#ffd700'} size={30} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );

}