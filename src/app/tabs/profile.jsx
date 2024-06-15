import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getProfile, logout } from '../../services/authService';

const Profile = ({setIsAuthenticated }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      setIsAuthenticated(true);
      }
    };
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {profile ? (
        <View style={styles.profileContainer}>
          <Text style={styles.headerText}>Kullanıcı Bilgilerim</Text>
          <View style={styles.profileItem}>
            <Text style={styles.label}>E-Mail:</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Ad Soyad:</Text>
            <Text style={styles.value}>{profile.firstName} {profile.lastName}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Yaş:</Text>
            <Text style={styles.value}>{profile.age}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Cinsiyet:</Text>
            <Text style={styles.value}>{profile.gender}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Boy:</Text>
            <Text style={styles.value}>{profile.height} cm</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Kilo:</Text>
            <Text style={styles.value}>{profile.weight} kg</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Günlük fiziksel aktivite seviyes:</Text>
            <Text style={styles.value}>{profile.activityLevel}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Hedef:</Text>
            <Text style={styles.value}>{profile.goal}</Text>
          </View>
          <Button
            title="Logout"
            onPress={() => {
              logout();
              setIsAuthenticated(false);
            }}
            color="#e74c3c"
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      )}
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
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#34495e',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#2c3e50',
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default Profile;
