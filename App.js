import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import PopularMovies from './PopularMovies';
// import Movie from './Movie';
// import {Provider} from 'react-redux';
// import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    //     <Provider store={store}>
    //     <Main />
    //   </Provider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="PopularMovies" component={PopularMovies} />
        {/* <Stack.Screen name="Movie" component={Movie} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
