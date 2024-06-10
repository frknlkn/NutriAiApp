import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NutriAI!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DietList')}>
        <Text style={styles.buttonText}>Show Diet Plans</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Home;
