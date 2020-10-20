import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet ,View, Text, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../App';
//import {GoalContext} from '../App';
import {GoalContext} from '../Contexts/GoalList';
//import {AddTest} from '../GoalAPI';
import FireTest from '../GoalAPI';

import * as firebase from 'firebase';
import 'firebase/firestore';

const Stack = createStackNavigator();

function goalScreen({navigation}){
  let [pep,seb] = useState(0);
  //  let Goal = useGoalList();
  // let Goal = App.globalgoal;

  const goal = useContext(GoalContext);
  console.log("1");
  useEffect(()=> {
    
    
  })
  return(
    <View style={styles.container}>
      <Button title="New Goal" onPress={() => navigation.navigate('newGoal') }/>
      <Text>Goal, {pep}</Text>
      <Button title="TEST" onPress={() => seb(pep + 1) }/>

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



function newGoal(){
    return(
        <View style={styles.container}>
          
        <Text>Goal, </Text>
        <Button title="TEST" onPress={() => AddUser()}/>
        
      </View>
    );
}
getUser = async () => {
  const userDoc = await firebase.firestore().collection("users").doc("lhSUEsi6xIWH9xmD569B").get();
  console.log(userDoc);
}

async function AddUser() {
  await firebase.firestore().collection("users").doc().add({
    name: beb,

  });
}


export default class goal extends Component {
  constructor() {
    super();
    console.log("One");
  }

  render() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Goals" component={goalScreen}/>
        <Stack.Screen name="newGoal" component={newGoal}/> 
      </Stack.Navigator>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    goalBox: {
      width: '77%',
      height: '15%',
      alignItems: 'center',
      backgroundColor: 'red',
      marginTop: '5%',
       justifyContent: 'center',
    }
  });
  