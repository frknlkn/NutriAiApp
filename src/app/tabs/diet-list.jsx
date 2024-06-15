import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { getDietPlans, generateDietPlan } from '../../services/dietService';

const DietList = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDietPlans, setShowDietPlans] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    if (showDietPlans) {
      fetchDietPlans();
    }
  }, [showDietPlans]);

  const fetchDietPlans = async () => {
    setLoading(true);
    try {
      const response = await getDietPlans();
      console.log("Fetched Diet Plans: ", response.dietPlans);
      setDietPlans(response.dietPlans || []);
      setTotalCalories(response.totalCalories || 0);
    } catch (error) {
      console.error('Error fetching diet plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await generateDietPlan();
      fetchDietPlans();
    } catch (error) {
      console.error('Error generating diet plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedMeals = dietPlans.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = {
        meal: item.meal,
        foods: [],
        totalCalories: 0,
      };
    }
    acc[item.time].foods.push({ name: item.food, calories: item.calories });
    acc[item.time].totalCalories += item.calories;
    return acc;
  }, {});

  const renderMeal = (time, index) => (
    <View key={index} style={styles.mealContainer}>
      <View style={styles.row}>
        <Text style={styles.mealTitle}>{groupedMeals[time].meal}</Text>
        <Text style={styles.mealTime}>{time}</Text>
      </View>
      {groupedMeals[time].foods.map((food, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.foodItem}>{food.name}</Text>
          <Text style={styles.foodCalories}>{food.calories} kcal</Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Toplam</Text>
        <Text style={styles.totalCalories}>{groupedMeals[time].totalCalories} kcal</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Günlük Diyet Planı</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : showDietPlans ? (
        Object.keys(groupedMeals).length > 0 ? (
          Object.keys(groupedMeals).map((time, index) => renderMeal(time, index))
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleGenerate}>
            <Text style={styles.buttonText}>Generate Diet Plan</Text>
          </TouchableOpacity>
        )
      ) : (
        setShowDietPlans(true)
      )}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Günlük Kalori Alımı</Text>
        <Text style={styles.totalCalories}>{totalCalories} kcal</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#34495e',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ecf0f1',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
  mealContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    paddingVertical: 5,
  },
  mealTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  mealTime: {
    flex: 1,
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  foodItem: {
    flex: 3,
    fontSize: 16,
    color: '#2c3e50',
  },
  foodCalories: {
    flex: 1,
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopColor: '#bdc3c7',
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  button: {
    backgroundColor: '#1abc9c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DietList;
