//React
import React from "react";

import { StyleSheet, View } from 'react-native';
// Native Base
import { NativeBaseProvider, StatusBar } from 'native-base';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

//component
import theme from './src/theme/NativeBase';
import COLORS from "./src/theme/COLORS";
import AdminContainer from "./src/navigation/Admin/AdminContainer";

//Redux
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AuthStack from "./src/navigation/Auth/AuthStack";
import HomeStack from "./src/navigation/User/Stacks/HomeStack";

const App = () => {
  return (
    <View style={styles.container} >
      <Provider store={store}>
          <NativeBaseProvider theme={theme} >
            <NavigationContainer>
              <StatusBar backgroundColor={'#34aa99'} barStyle={'dark-content'} />
              {/* <HomeStack/> */}
              <AuthStack/>
            </NavigationContainer>
          </NativeBaseProvider>
      </Provider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});