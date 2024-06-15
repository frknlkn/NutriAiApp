import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GlobalProvider } from './src/context/GlobalProvider';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { getToken } from './src/services/authService'; 

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
          setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GlobalProvider>
      {isAuthenticated ? <AppNavigator setIsAuthenticated={setIsAuthenticated} /> : <AuthNavigator setIsAuthenticated={setIsAuthenticated} />}
    </GlobalProvider>
  );
};
export default App;
