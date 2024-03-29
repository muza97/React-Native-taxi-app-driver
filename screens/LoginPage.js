import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import SignupBottomSheet from '../components/SignupBottomSheet'; // Make sure the path matches your file structure

const LoginPage = ({ navigation }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, isSignupVisible, setSignupVisible } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api-hdzvzie4ya-uc.a.run.app/api/login/driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        await AsyncStorage.setItem('userToken', data.token);
        setIsAuthenticated(true);
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
    <Image
      source={require('../assets/image/Unknown-6.jpeg')} // Adjust the path as necessary
      style={styles.logo}
    />
    {/* <View style={styles.container}> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
         <Button title="Sign Up" onPress={() => setSignupVisible(true)} />
      {isSignupVisible && (
        <SignupBottomSheet
          visible={isSignupVisible}
          onClose={() => setSignupVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 30,

  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
  },
});

export default LoginPage;
