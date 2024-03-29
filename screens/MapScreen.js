//screens/MapScreen.js
import {View, Text, StyleSheet} from "react-native"

const MapScreen = () => {
    return (
        <View style={styles.container}>
        <Text style= {styles.text}>Welcome to the Map</Text> 
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center", 
      justifyContent: "center",
    },
    text: {
      fontSize: 30,
      fontWeight: "bold", 
      marginBottom: 16, 
    },
  });
