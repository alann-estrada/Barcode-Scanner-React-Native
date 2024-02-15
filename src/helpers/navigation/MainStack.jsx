import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home';
import Generator from '../../Screens/Generator';
import Creator from '../../Screens/Creator';

const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Generator' component={Generator} />
                <Stack.Screen name='Creator' component={Creator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}