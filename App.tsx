import React from 'react';
import { SafeAreaView } from 'react-native';
import Home from './src/screens/Home/Home';
import globalStyle from './assets/styles/globalStyle';

const App = () => {
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.marginHorizontal]}>
            <Home />
        </SafeAreaView>
    );
};

export default App;
