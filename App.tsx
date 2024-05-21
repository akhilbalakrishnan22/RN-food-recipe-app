import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import globalStyle from './assets/styles/globalStyle';
import OnboardingNavigation from './src/navigation/OnboardingNavigation';
import AppStackNavigation from './src/navigation/StackNavigation';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

    useEffect(() => {
        const retrieveOnboardingStatus = async () => {
            try {
                setLoading(true);
                const storedValue = await AsyncStorage.getItem('hasOnboarded');
                storedValue ? setHasOnboarded(JSON.parse(storedValue)) : false;
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        retrieveOnboardingStatus();
    }, []);

    if (loading) {
        return (
            <View style={globalStyle.loadingIndicator}>
                <ActivityIndicator size={'large'} color={'#25AE87'} />
            </View>
        );
    }
    return (
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
            {hasOnboarded ? <AppStackNavigation /> : <OnboardingNavigation />}
        </NavigationContainer>
    );
};

export default App;
