import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/Home';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = React.useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  React.useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const value = await AsyncStorage.getItem('isOnboardingCompleted');
        if (value !== null) {
          setState({ isLoading: false, isOnboardingCompleted: JSON.parse(value) });
        } else {
          setState({ isLoading: false, isOnboardingCompleted: false });
        }
      } catch (error) {
        console.log('Error loading onboarding state:', error);
        setState({ isLoading: false, isOnboardingCompleted: false });
      }
    };
    loadOnboardingState();
  }, []);

  const completeOnboarding = async (firstName, email, lastName) => { // lastNameを追加
    try {
      const profileData = { firstName, lastName, email, avatarSource: null, notifications: { orderStatuses: true, passwordChanges: true, specialOffers: true, newsletter: true } };
      console.log('Saving profileData:', JSON.stringify(profileData));
      await AsyncStorage.setItem('isOnboardingCompleted', JSON.stringify(true));
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      setState((prevState) => ({ ...prevState, isOnboardingCompleted: true }));
    } catch (error) {
      console.log('Error saving onboarding state:', error);
    }
  };

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isOnboardingCompleted ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{ setState, saveChanges: completeOnboarding }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              initialParams={{ setState, saveChanges: completeOnboarding }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            initialParams={{ completeOnboarding, firstName: '', email: '', lastName: '' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}