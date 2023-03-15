import React, { Component } from "react";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Firestore
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyACuO3Ewx4paWZruug4ezh2-suRHBG2NzM",
    authDomain: "chatapp-63987.firebaseapp.com",
    projectId: "chatapp-63987",
    storageBucket: "chatapp-63987.appspot.com",
    messagingSenderId: "491146204358",
    appId: "1:491146204358:web:e69c07adf61f8f64a973c7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Create the navigator
  const Stack = createNativeStackNavigator();

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
