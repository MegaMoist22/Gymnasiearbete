import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { Component, useContext, useState, createContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GoalsComponent from './screens/GoalsComponent';
import { GoalContext } from './Contexts/GoalList';
import loginScreen from './loginScreen';
import { GoalAPI } from './GoalAPI';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GoalBox() {
  const goal = useContext(GoalContext);

  return (
    <View>

      {goal.map((item) => {
        return (
          <View style={styles.goalBox} key={item.key}>
            <Text >{item.name}</Text>
          </View>
        )
      })}
    </View>
  );
}
//end TEst Context
function homeScreen() {
  const goal = useContext(GoalContext);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <GoalContext.Provider value={goal}>
        <GoalBox />
      </GoalContext.Provider>

    </View>

  );
}
function homeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={homeScreen} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super();
    GoalAPI.init();
  }

  // createHomeStack = () => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={homeScreen} />
  //     </Stack.Navigator>
  //   );
  // };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={homeStackScreen} />
          <Tab.Screen name="Goals" component={GoalsComponent} />

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
    // justifyContent: 'center',
  },
  goalBox: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: '5%',
    justifyContent: 'center',
  }
});
