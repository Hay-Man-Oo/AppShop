import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import All from "../TabScreens/All";
import WomanClothing from "../TabScreens/WomanClothing";
import MenClothing from "../TabScreens/MenClothing";
import Shoes from "../TabScreens/Shoes";
import Accessories from "../TabScreens/Accessories";

export default function Products({ navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="All"
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
          <MaterialCommunityIcons name="home" color={'#ffd700'} size={30} />
        ),
        
      }}
    >
      <Tab.Screen
        name="All"
        component={All}
      />
      <Tab.Screen
        name="Woman"
        component={WomanClothing}
        options={{
          tabBarLabel: 'WomanClothes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="woman" color={'#ffd700'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Men"
        component={MenClothing}
        options={{
          tabBarLabel: 'MenClothes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="man" color={'#ffd700'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Shoes"
        component={Shoes}
        options={{
          tabBarLabel: 'Shoes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shoe-heel" color={'#ffd700'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Accessories"
        component={Accessories}
        options={{
          tabBarLabel: 'Accessories',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="necklace" color={'#ffd700'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );

}