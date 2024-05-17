import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import OnboardingNavigation from './src/navigation/OnboardingNavigation';
import AppStackNavigation from './src/navigation/StackNavigation';

const App = () => {
    const [hasOnboarded, setHasOnboarded] = useState(false);

    useEffect(() => {
        const retrieveOnboardingStatus = async () => {
            const storedValue = await AsyncStorage.getItem('hasOnboarded');
            storedValue ? setHasOnboarded(JSON.parse(storedValue)) : false;
        };

        retrieveOnboardingStatus();
    }, []);

    return (
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
            {hasOnboarded ? <AppStackNavigation /> : <OnboardingNavigation />}
        </NavigationContainer>
    );
};

export default App;
