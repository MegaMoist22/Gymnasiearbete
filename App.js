import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { Component, useContext, useState, createContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import  goal  from './screens/goal';
import {GoalContext} from './Contexts/GoalList';

import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2whzjMNORgV02F3NcFPU_s-IhJkFDseE",
  authDomain: "gymnasiearbete-2ccea.firebaseapp.com",
  databaseURL: "https://gymnasiearbete-2ccea.firebaseio.com",
  projectId: "gymnasiearbete-2ccea",
  storageBucket: "gymnasiearbete-2ccea.appspot.com",
  messagingSenderId: "777995089302",
  appId: "1:777995089302:web:90520034f4f55e070419b7",
  measurementId: "G-PGRPBP229X"
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


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
     // Initialize Firebase
 if(!firebase.apps.length){
 
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  console.log("Fire base Initialized!")
 }
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
