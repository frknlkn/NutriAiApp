import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { register } from '../../services/authService';

const SignUp = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await register(userData);
      navigation.navigate('SignIn');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        placeholder="Username"
        value={userData.username}
        onChangeText={(text) => setUserData({ ...userData, username: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="First Name"
        value={userData.firstName}
        onChangeText={(text) => setUserData({ ...userData, firstName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={userData.lastName}
        onChangeText={(text) => setUserData({ ...userData, lastName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={userData.age}
        onChangeText={(text) => setUserData({ ...userData, age: text })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Gender"
        value={userData.gender}
        onChangeText={(text) => setUserData({ ...userData, gender: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Height (cm)"
        value={userData.height}
        onChangeText={(text) => setUserData({ ...userData, height: text })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Weight (kg)"
        value={userData.weight}
        onChangeText={(text) => setUserData({ ...userData, weight: text })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Activity Level"
        value={userData.activityLevel}
        onChangeText={(text) => setUserData({ ...userData, activityLevel: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Goal"
        value={userData.goal}
        onChangeText={(text) => setUserData({ ...userData, goal: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.loginText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#0066cc',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SignUp;
