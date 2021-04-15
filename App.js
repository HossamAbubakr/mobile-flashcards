import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { setLocalNotification } from "./utils/helpers";
import Constants from "expo-constants";
import reducer from "./reducers";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";

// All the examples from Udacity were either deprecated or moved to other packages
// For example ALL the navigation and I had to resort to the official documentations to make any sense of Udacity's example!
// Ref : https://reactnavigation.org/docs/material-top-tab-navigator/
// Ref : https://reactnavigation.org/docs/stack-navigator/

const Tab = Platform.OS === "ios" ? createBottomTabNavigator() : createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

function DeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DeckTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Deck" component={Deck} />
      <Stack.Screen name="Card" component={NewCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

function DeckTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        tabStyle: {
          flexDirection: "row",
        },
      }}
    >
      <Tab.Screen name="Decks" component={DeckList} options={{ tabBarIcon: () => <MaterialCommunityIcons name="cards-outline" size={24} color="black" /> }} />
      <Tab.Screen name="Add Deck" component={NewDeck} options={{ tabBarIcon: () => <Entypo name="add-to-list" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
}

const store = createStore(reducer);
export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <CardsStatusBar backgroundColor="#FFF" barStyle="light-content" />
        <NavigationContainer>
          <DeckStack />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
