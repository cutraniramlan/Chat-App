import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
    navigation.setOptions({ color });
  }, []);

  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <Text>Hello, Happy Chatting!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
