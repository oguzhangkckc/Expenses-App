import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SettingsScreen from './screens/SettingsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs (){
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home';
        }else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{headerShown:false, }}/>
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LogInScreen} 
          options={{headerStyle:{backgroundColor:"#1aacf0"}, headerShown:false}}/>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerStyle:{backgroundColor:"#1aacf0"}, headerShown:false}}/>
        <Stack.Screen 
          name='Main'
          component={Tabs}
          options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
