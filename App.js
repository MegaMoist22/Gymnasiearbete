import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { Component, useContext, useState, createContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GoalsComponent from './screens/GoalsComponent';
import { GoalContext } from './Contexts/GoalList';
import { GoalAPI } from './GoalAPI';

import moment from "moment";
import { Button } from 'react-native';
// import { Button } from 'react-native';
// import * as firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';
//import * as Google from 'expo-google-app-auth';
// import * as AppAuth from 'expo-app-auth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
let dayNum = "";
let fixday = "";
let dailyGoals = [];


function GoalBox() {
  const goal = useContext(GoalContext);

  return (
    <View>
      <Button onPress={() => buttonTest()} title="ss" />
      {dailyGoals.map((item) => {
        return (
          <View style={styles.goalBox} key={item.key}>
            <Text >{item.name} +  {fixday}</Text>
          </View>
        )
      })}

    </View>
  );
}
function buttonTest() {
  console.log(dailyGoals);
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

// async function onLoginButtonPress() {
//   //const { idToken } = await Google.logInAsync({ clientId: "777995089302-5c11qbder2qoqedjlqh6mkibp3s1ufvp.apps.googleusercontent.com" });
//   /*const result = await Google.logInAsync({
//     androidClientId: "777995089302-1te1k179fg2ppnd13klkq9tckch31ame.apps.googleusercontent.com",
//     scopes: ["profile", "email"],
//   });*/

//   const result = await AppAuth.authAsync({
//     issuer: 'https://accounts.google.com',
//     scopes: ['openid', 'profile'],
//     clientId: '777995089302-5c11qbder2qoqedjlqh6mkibp3s1ufvp.apps.googleusercontent.com',
//   });

//   //const { idToken } = await GoogleSignIn.signInAsync();
//   const credential = firebase.auth().GoogleAuthProvider.credential(result.accessToken);

//   return auth().signInWithCredential(credential);
// }

// function loginScreen() {
//   return (
//     <View>
//       <Text>loginScreen</Text>
//       <Button title="Login" onPress={onLoginButtonPress} />
//     </View>

//   );
// }

function homeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={homeScreen} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  state = {
    user: null,
    goals: [],

  };

  constructor(props) {
    super();
    dayNum = moment().format('e');
    this.numberDayFixer();
    GoalAPI.init();
    GoalAPI.getAllGoals()
      .then(goals => this.setState({
        goals: goals.filter(goal => goal.data().days[fixday]).map(doc => {
          console.log(doc.data())
          return {
            name: doc.data().name,
            description: doc.data().description,
            id: doc.id,
            days: doc.data().days,
          };
        })
      }));
    dailyGoals = this.state.goals;
    console.log("______________________" + fixday);
    console.log(dailyGoals);
    // this.unsubscribe = firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  numberDayFixer() {
    if (dayNum >= 1) {
      fixday = dayNum - 1;
    } else {
      fixday = 6;
    }

  }

  /*componentDidMount() {
    GoogleSignIn.initAsync({
      clientId: "AIzaSyBAuDfQ2F2QahjE6GXmITGpFxUMTD8pqTU",
    });
  }*/

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // onAuthStateChanged(user) {
  //   this.setState({ user: user });
  // }

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
