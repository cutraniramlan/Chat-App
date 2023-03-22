import React, { Component, useEffect } from "react";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

import { useNetInfo } from "@react-native-community/netinfo";

import { LogBox, Alert } from "react-native";
import { getStorage } from "firebase/storage";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    // FIREBASE CONFIG INFO
    apiKey: "AIzaSyACuO3Ewx4paWZruug4ezh2-suRHBG2NzM",
    authDomain: "chatapp-63987.firebaseapp.com",
    projectId: "chatapp-63987",
    storageBucket: "chatapp-63987.appspot.com",
    messagingSenderId: "491146204358",
    appId: "1:491146204358:web:e69c07adf61f8f64a973c7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");

      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
