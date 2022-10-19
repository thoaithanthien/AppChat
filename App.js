import { View, Text, Settings } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// import Navigation from './src/navigation/Navigator';
import RegisterLogin from './src/navigation/Navigator'

const App = () => {
  return (
    <NavigationContainer>
      <RegisterLogin/>
    </NavigationContainer>
    
  )
}

export default App