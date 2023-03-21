import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
  black: { backgroundColor: "#090C08" },
  purple: { backgroundColor: "#474056" },
  grey: { backgroundColor: "#d8d1d8" },
  green: { backgroundColor: "#94ae89" },
};

const Start = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const { black, purple, grey, green } = backgroundColors;
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        console.log(result);
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundImage2.png")}
        style={styles.image}
      >
        <Text style={styles.title}></Text>
        <View style={styles.box}>
          <TextInput
            style={[styles.input, styles.text]}
            onChangeText={(newName) => setName(newName)}
            value={name}
            placeholder="Enter your username..."
          />
          <View>
            <Text style={styles.text}>Choose your Background Color</Text>
            <View style={[styles.colors, styles.colorWrapper]}>
              <TouchableOpacity
                style={[
                  styles.color,
                  black,
                  color === black.backgroundColor ? styles.colorSelected : {},
                ]}
                onPress={() => setColor(black.backgroundColor)}
              />
              <TouchableOpacity
                style={[
                  styles.color,
                  purple,
                  color === purple.backgroundColor ? styles.colorSelected : {},
                ]}
                onPress={() => setColor(purple.backgroundColor)}
              />
              <TouchableOpacity
                style={[
                  styles.color,
                  grey,
                  color === grey.backgroundColor ? styles.colorSelected : {},
                ]}
                onPress={() => setColor(grey.backgroundColor)}
              />
              <TouchableOpacity
                style={[
                  styles.color,
                  green,
                  color === green.backgroundColor ? styles.colorSelected : {},
                ]}
                onPress={() => setColor(green.backgroundColor)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            title="Start Chatting"
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#363636",
    opacity: 50,
  },

  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    resizeMode: "cover",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
  },

  text: {
    color: "#757083",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
  },

  colors: {
    flexDirection: "row",
  },

  box: {
    backgroundColor: "#fff",
    width: "88%",
    alignItems: "center",
    height: "44%",
    justifyContent: "space-evenly",
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 40,
  },

  colorSelected: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#5f5f5f",
  },

  input: {
    height: 50,
    width: "88%",
    borderColor: "gray",
    color: "#757083",
    borderWidth: 2,
    borderRadius: 20,
  },

  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    padding: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  colorWrapper: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Start;
