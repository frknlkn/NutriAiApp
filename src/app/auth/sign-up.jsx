import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
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
  const [emailError, setEmailError] = useState('');

  const handleRegister = async () => {
    if (!validateEmail(userData.email)) {
      setEmailError('Doğru formatta yazın');
      return;
    }
    setEmailError('');
    try {
      await register(userData);
      navigation.navigate('SignIn');
    } catch (error) {
      setError('Registration failed');
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (key, value) => {
    if (key === 'age' || key === 'height' || key === 'weight') {
      value = value.replace(/[^0-9]/g, '');
    }
    setUserData({ ...userData, [key]: value });
  };

  const genderData = [
    { label: 'Kadın', value: 'Kadın' },
    { label: 'Erkek', value: 'Erkek' },
  ];

  const activityLevelData = [
    { label: 'Düşük', value: 'Düşük' },
    { label: 'Orta', value: 'Orta' },
    { label: 'Yüksek', value: 'Yüksek' },
  ];

  const goalData = [
    { label: 'Kilo Vermek', value: 'Kilo Vermek' },
    { label: 'Kilo Almak', value: 'Kilo Almak' },
    { label: 'Korumak', value: 'Korumak' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Merhaba,</Text>
      <View style={styles.formContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabInactive} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.tabTextInactive}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Üye Ol</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Kullanıcı Adı"
          value={userData.username}
          onChangeText={(text) => handleChange('username', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="E-Mail"
          value={userData.email}
          onChangeText={(text) => handleChange('email', text)}
          style={[styles.input, emailError && styles.inputError]}
          keyboardType="email-address"
          autoCapitalize="none"
          onBlur={() => {
            if (!validateEmail(userData.email)) {
              setEmailError('Doğru formatta yazın');
            } else {
              setEmailError('');
            }
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          placeholder="Ad"
          value={userData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Soyad"
          value={userData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Yaş"
          value={userData.age}
          onChangeText={(text) => handleChange('age', text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <Dropdown
          style={styles.dropdown}
          data={genderData}
          labelField="label"
          valueField="value"
          placeholder="Cinsiyet Seçin"
          value={userData.gender}
          onChange={(item) => handleChange('gender', item.value)}
        />
        <TextInput
          placeholder="Boy (cm)"
          value={userData.height}
          onChangeText={(text) => handleChange('height', text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Kilo (kg)"
          value={userData.weight}
          onChangeText={(text) => handleChange('weight', text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <Dropdown
          style={styles.dropdown}
          data={activityLevelData}
          labelField="label"
          valueField="value"
          placeholder="Günlük Aktivite Seviyesi Seçin"
          value={userData.activityLevel}
          onChange={(item) => handleChange('activityLevel', item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          data={goalData}
          labelField="label"
          valueField="value"
          placeholder="Hedef Seçin"
          value={userData.goal}
          onChange={(item) => handleChange('goal', item.value)}
        />
        <TextInput
          placeholder="Şifre"
          value={userData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>KAYIT OL</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabInactive: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabTextActive: {
    color: '#FF6600',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#888',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
  inputError: {
    borderColor: 'red',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF6600',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#FF6600',
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
