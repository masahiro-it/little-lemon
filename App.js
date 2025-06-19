import  * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = React.useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  React.useEffect(() => {
    // AsyncStorageからオンボーディング完了フラグを読み込む
    const loadOnboardingState = async () => {
      try {
        const value = await AsyncStorage.getItem('isOnboardingCompleted');
        if (value !== null) {
          setState({ isLoading: false, isOnboardingCompleted: JSON.parse(value) });
        } else {
          setState({ isLoading: false, isOnboardingCompleted: false })
        }
      } catch (error) {
        console.log('Error loading onboarding state:', error);
        setState({ isLoading: false, isOnboardingCompleted: false })
      }
    };

    loadOnboardingState();
  }, []);

  // オンボーディング完了時にAsyncStorageに保存
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('isOnboardingCompleted', JSON.stringify(true));
      setState((prevState) => ({ ...prevState, isOnboardingCompleted: true }));
    } catch (error) {
      console.log('Error saving onboarding state:', error);
    }
  };

  if (state.isLoading) {
    // AsyncStorageの読み込みが完了するまでスプラッシュスクリーンを表示
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isOnboardingCompleted ? (
          // オンボーディング完了、 Profile画面に移動
          <Stack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          // オンボーディング未完了、Onboarding画面を表示
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            initialParams={{ completeOnboarding }} // completeOnboarding関数を返す
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )


}