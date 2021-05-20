import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

import React, { Component, useContext, useState, createContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import GoalsComponent from './screens/GoalsComponent';
import { GoalContext } from './Contexts/GoalList';
import { GoalAPI } from './GoalAPI';
import { ScrollView } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

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
const window = Dimensions.get("window");


function buttonTest() {
  console.log("---------- ");
  console.log(moment().format('dddd'));
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

class Main extends Component {
  state = {

    goals: [],

  };
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
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
    console.log(this.state.goals);
  }

  componentDidMount() {
    this._unsubscribe = this.navigation.addListener('focus', () => {
      // do something

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

    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <Button onPress={() => buttonTest()} title="ss" /> */}
        <Text style={{ marginTop: "5%", fontSize: 20, marginBottom: "2%" }}>Goals for today </Text>

        <ScrollView style={{ width: "100%", }}>
          {this.state.goals.map((item) => {
            return (
              <Pressable style={styles.goalBox} key={item.key} onPress={() => this.navigation.navigate('Goals', { screen: "Goal Page", params: item, initial: false, }, item)}>
                <Text style={{ marginLeft: "2%", color: "white" }} >{item.name} </Text>
              </Pressable>
            );
          })}

        </ScrollView>

      </View>

    );
  }
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

    // this.unsubscribe = firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  numberDayFixer() {
    if (dayNum >= 1) {
      fixday = dayNum - 1;
    } else {
      fixday = 6;
    }

  }


  // homeScreen() {


  //   return (
  //     <View style={styles.container}>
  //       <Text>Home</Text>

  //     </View>

  //   );
  // }
  homeStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    );
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

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Goals') {
                iconName = focused ? 'view-list' : 'view-list-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'cornflowerblue',
            inactiveTintColor: 'gray',
          }}



        >
          <Tab.Screen name="Home" component={this.homeStackScreen} />
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
    width: '77%',
    //height: '15%',
    height: window.height * 0.12,
    alignItems: 'flex-start',
    backgroundColor: '#60AFFF',
    marginTop: '3%',
    justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 7,
  },


});
