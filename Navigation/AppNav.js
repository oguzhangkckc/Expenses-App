import React from "react";
import { View, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllScreen from "../screens/AllScreen";
import RecentScreen from "../screens/RecentScreen";
import AddScreen from "../screens/AddScreen";
import UpdateScreen from "../screens/UpdateScreen";
import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useLogout } from "../components/Logout";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { user } = UseAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={TabsStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerStyle: { backgroundColor: "#1aacf0" },
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs({ navigation}) {
  const { user } = UseAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "All Expenses") {
            iconName = focused ? "calendar-outline" : "calendar-outline";
          } else if (route.name === "Recent Expenses") {
            iconName = focused ? "hourglass-outline" : "hourglass-outline";
          }else if (route.name === "Profile") {
            iconName = focused ? "person-outline" : "person-outline";
          }
          return <Ionicons name={iconName} size={30} color="white" />;
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "#1aacf0" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#003b88",
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}
            />
          </View>
        ),
        headerBackground: () => (
          <View style={{ flex: 1, backgroundColor: "#1aacf0" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#003b88",
                borderBottomStartRadius: 20,
                borderBottomEndRadius: 20,
              }}
            />
          </View>
        ),
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="All Expenses"
        component={AllScreen}
        options={{
          headerStyle: { backgroundColor: "#003b88", height: 110 },
          headerTintColor: "white",
        }}
      />
      <Tab.Screen
        name="Recent Expenses"
        component={RecentScreen}
        options={{
          headerRight: () => (
            <Ionicons
              name="add"
              size={30}
              color="white"
              style={{ paddingRight: 20 }}
              onPress={() => navigation.navigate("Add")}
            />
          ),
          headerStyle: { backgroundColor: "#003b88", height: 110 },
          headerTintColor: "white",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: () => (
            <Ionicons
              name="log-out"
              size={30}
              color="white"
              style={{ paddingLeft: 20 }}
              onPress={() =>
                Alert.alert("Are you sure you want to log out?", "", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Log Out",
                    onPress: () => handleLogout(),
                  },
                ])
              }
            />
          ),
          headerStyle: { backgroundColor: "#003b88", height: 110 },
          headerTintColor: "white",
        }}
      />
    </Tab.Navigator>
  );
}

function TabsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Expenses"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerStyle: { backgroundColor: "#003b88" },
          headerTintColor: "white",
          presentation: "modal",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Update"
        component={UpdateScreen}
        options={{
          headerStyle: { backgroundColor: "#003b88" },
          headerTintColor: "white",
          presentation: "modal",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{
          headerStyle: { backgroundColor: "#003b88" },
          headerTintColor: "white",
          presentation: "modal",
          headerBackTitleVisible: false,
        }}/>
    </Stack.Navigator>
  );
};
