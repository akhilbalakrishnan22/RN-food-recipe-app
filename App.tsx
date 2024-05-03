import React from 'react';
import { SafeAreaView } from 'react-native';
import globalStyle from './assets/styles/globalStyle';
import Home from './src/screens/Home/Home';

const App = () => {
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.marginHorizontal]}>
            <Home />
        </SafeAreaView>
    );
};

export default App;
