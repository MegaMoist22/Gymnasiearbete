import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { Component, useContext, useState, createContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import  goal  from './screens/goal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GoalList = [
  {name: 'Pall', key:'1'},
  {name: 'pallo', key:'2'}
];
export const GoalContext = React.createContext(GoalList);
// const [Goal,setGoal] = useState([
//   {name: 'mål', Key: '1'},
//   {name: 'tål', Key: '2'},
//   {name: 'kål', Key: '3'},
// ]);

// const GoalContext = createContext(Goal);

function GoalBox(){
  const goal = useContext(GoalContext);

  return(
  <View>
    
    {goal.map((item) =>{
        return(
          <View style={styles.goalBox} key={item.key}>
            <Text >{item.name}</Text>
          </View>
        )
      })}
  </View>
  );  
}
//end TEst Context
function homeScreen(){
  const goal = useContext(GoalContext);
  
  return(
  <View style={styles.container}>
    <Text>Home</Text>
    <GoalContext.Provider value={goal}>
      <GoalBox />
    </GoalContext.Provider>
    
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
    super();
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
