import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getProfile, logout } from '../../services/authService';

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };
    fetchProfile();
  }, []);

  return (
    <View>
      {profile ? (
        <View>
          <Text>Email: {profile.email}</Text>
          <Text>Name: {profile.firstName} {profile.lastName}</Text>
          {/* Diğer kullanıcı bilgilerini de burada göster */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Logout" onPress={() => {
        logout();
        navigation.navigate('SignIn');
      }} />
    </View>
  );
};

export default Profile;
