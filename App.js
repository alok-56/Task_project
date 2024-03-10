import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Images from './Src/Pages/Image';
import ImageDetails from './Src/Pages/ImageDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown:false
        }} name="Home" component={Images} />
        <Stack.Screen name="details Screen" component={ImageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
