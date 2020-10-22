import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

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
import DialogInput from 'react-native-dialog-input';

const Stack = createStackNavigator();

class GoalScreen extends Component {
  static contextType = GoalContext;

  state = {
    goals: [],
  };

  constructor({ navigation }) {
    super();
    this.navigation = navigation;

    GoalAPI.getAllGoals().then(goals => this.setState({ goals: goals }));
  }

  //[pep, seb] = useState(0);
  //  let Goal = useGoalList();
  // let Goal = App.globalgoal;
  //goal = useContext(GoalContext);

  render() {
    console.log(this.state.goals);
    return (
      <View style={styles.container}>
        <Button title="New Goal" onPress={() => this.navigation.navigate('newGoal')} />
        <Text>Goal</Text>
        <ScrollView >
          {this.state.goals.map((item) => {
            return (
              <View style={styles.goalBox} key={0}>
                <Text >{item.name}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

export class NewGoalScreen extends Component {
  state = {
    title: "",
    isDescriptionDialogVisable: false,
    description: "",
  }

  constructor() {
    super();
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
            <Button title="Add" onPress={() => GoalAPI.addGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title)).catch(err => console.log(err))} />
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
        <Stack.Screen name="newGoal" component={NewGoalScreen} />
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
});
