import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import BottomNavigation from './src/navigation/BottomNavigation';
import OnboardingNavigation from './src/navigation/OnboardingNavigation';

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
        <NavigationContainer>
            {hasOnboarded ? <BottomNavigation /> : <OnboardingNavigation />}
        </NavigationContainer>
    );
};

export default App;
