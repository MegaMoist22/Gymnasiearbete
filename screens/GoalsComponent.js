import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import App from '../App';
//import {GoalContext} from '../App';
import { GoalContext } from '../Contexts/GoalList';
//import {AddTest} from '../GoalAPI';
import FireTest, { addGoal, GoalAPI } from '../GoalAPI';

import firebase from 'firebase';
import 'firebase/firestore';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Goal } from './models/Goal';
//import GoalPage from './GoalPage';
import DialogInput from 'react-native-dialog-input';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import InputGoal from '../Contexts/InputGoal';
import Stats from '../Stats/';



const Stack = createStackNavigator();
const window = Dimensions.get("window");

class GoalScreen extends Component {
  static contextType = GoalContext;

  state = {
    goals: [],
    user: {},

  };
  statusNew = false;
  TESTSTAT = true;
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    console.log("----------------------------------------------------");
    console.log(navigation);

    GoalAPI.getAllGoals()
      .then(goals => this.setState({
        goals: goals.map(doc => {
          return {
            name: doc.data().name,
            description: doc.data().description,
            id: doc.id,
            days: doc.data().days,
          }
        })
      }))
      .catch(err => console.log(err + "XXXXXXXXXX"));
    //GoalAPI.getUser("lhSUEsi6xIWH9xmD569B").then(user => this.setState({ user: user }, () => console.log(this.state.user)));

  }
  render() {

    console.log(this.state.goals);

    return (
      <View style={styles.GoalContainer}>
        <Button title="New Goal" onPress={() => this.navigation.navigate('newGoal', null, null)} />
        <Text>Goal {window.height}</Text>
        <ScrollView style={{ width: '100%', backgroundColor: "firebrick", }}>
          {this.state.goals.map((item, i) => {
            // console.log("i: ", i, " item: ", item)
            return (
              <Pressable onPress={() => this.navigation.navigate('GoalPage', item, item)} style={styles.goalBox} key={i}>

                <Text>{item.name} {i}</Text>

              </Pressable>

            )
          })}
        </ScrollView>
      </View>
    );
  }
}

export class NewGoalScreen extends Component { //GAMMAL TA BORT
  state = {
    title: "",
    isDescriptionDialogVisable: false,
    description: "",
    user: {},
    key: "0",
  }

  constructor() {
    super();
    // GoalAPI.getUser("lhSUEsi6xIWH9xmD569B").then(user =>
    //   this.setState({ user: user }, () => this.setState({ key: user.topKey + 1 })));
  }
  addButton() {

    GoalAPI.addGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title, this.state.description)).catch(err => console.log(err))
  }

  sendInput(inputText) {
    this.setState({ description: inputText });
    this.setState({ isDescriptionDialogVisable: false });
  }

  render() {
    return (
      <View style={styles.back}>
        <View style={styles.mid}>
          <Text>Goal</Text>
          <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '30%', }}
            value={this.state.title}
            placeholder="Goal title..."
            onChangeText={(value) => this.setState({ title: value })} />

          <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Add" onPress={() => this.addButton()} />
            <Button title="Description" onPress={() => this.setState({ isDescriptionDialogVisable: true })} />
          </View>

          <View>
            <Text>MÅ TI ON TO FR LÖ SÖ</Text>
          </View>

          <TouchableOpacity style={styles.addbutton} onPress={() => addProgression()}>
            <Text>Add progression</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.bottom}>
          <ScrollView>

          </ScrollView>
        </View>

        <DialogInput isDialogVisible={this.state.isDescriptionDialogVisable}
          title={"Description"}
          message={"Progession description"}
          hintInput={"Description..."}
          initValueTextInput={this.state.description}
          submitInput={(inputText) => { this.sendInput(inputText) }}
          closeDialog={() => { this.setState({ isDescriptionDialogVisable: false }) }}>
        </DialogInput>
      </View>
    );
  }
}

export default class GoalsComponent extends Component {
  constructor() {
    super();
    console.log("One");
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Goals" component={GoalScreen} />
        <Stack.Screen name="newGoal" component={InputGoal} />
        <Stack.Screen name="GoalPage" component={InputGoal} />
        <Stack.Screen name="Stats" component={Stats} />
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
    //height: '15%',
    height: window.height * 0.1,
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: '5%',
    justifyContent: 'center',
    alignSelf: "center",
  },
  mid: {
    //flex: 1,
    backgroundColor: '#fffbbb',
    marginLeft: '5%',
    //justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    backgroundColor: '#cd7d4a',
    marginLeft: '5%',
    //justifyContent: 'center',
  },
  back: {
    flex: 1,
    backgroundColor: '#fff',

    //justifyContent: 'center',
  },
  addbutton: {
    //flex: 1,
    backgroundColor: 'red',
    width: '40%',

    alignItems: 'center',
    marginTop: '5%',
    padding: '3%',
    borderRadius: 8,
    marginBottom: '10%',
    //justifyContent: 'center',
  },
  midBottom: {
    //flex: 1,
    flexDirection: "row",
    //justifyContent: 'center',
  },
  GoalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'flex-start',
  },
});
