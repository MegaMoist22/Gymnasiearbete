import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { Component, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { goal, GoalListContext } from './screens/goal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function homeScreen(){
  return(
  <View style={styles.container}>
    <Text>Home</Text>
  </View>
  );
}
function homeStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={homeScreen}/>
    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // App.globalgoal = Goal;
    
    // let [Goal,setGoal] = useState([
    //   {name: 'mål', Key: '1'},
    //   {name: 'tål', Key: '2'},
    //   {name: 'kål', Key: '3'},
    // ]);

  }

  createHomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen}/>
      </Stack.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name ="Home" component={homeStackScreen}/>
          <Tab.Screen name ="Goals" component={goal}/>

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
