
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Goal } from '../screens/models/Goal';
import FireTest, { addGoal, GoalAPI } from '../GoalAPI';
import DialogInput from 'react-native-dialog-input';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default class InputGoal extends Component {

    state = {
        title: "",
        isDescriptionDialogVisable: false,
        description: "",
        user: {},
        key: "0",

        // layout = {
        //     addButton: "Add",

        // },
    }
    layout = {
        addButton: "Add",

    }
    removeButton = null;
    constructor(item) {
        super();

        console.log(item);
        if (item.route.name == "GoalPage") {
            this.layout.addButton = "Save";
            this.state.title = item.route.params.name;
            this.state.description = item.route.params.description;
            this.removeButton = <Button title="Remove" onPress={() => this.removeGoal()} />;
        } else {//nYT MÅL


        }



        // GoalAPI.getUser("lhSUEsi6xIWH9xmD569B").then(user =>
        //   this.setState({ user: user }, () => this.setState({ key: user.topKey + 1 })));


    }
    addButton() {
        if (this.layout.addButton == "Add") { //add Goal
            GoalAPI.addGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title, this.state.description)).catch(err => console.log(err))

        } else { // save Goal

        }
    }

    sendInput(inputText) {
        this.setState({ description: inputText });
        this.setState({ isDescriptionDialogVisable: false });
    }
    removeGoal() {
        GoalAPI.removeGoal("lhSUEsi6xIWH9xmD569B",)
    }

    render() {
        return (
            <View style={styles.back}>
                <View style={styles.mid}>
                    <Text>Goal {this.state.title}</Text>
                    <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '30%', }}
                        value={this.state.title}
                        placeholder="Goal title..."
                        onChangeText={(value) => this.setState({ title: value })} />

                    <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={this.layout.addButton} onPress={() => this.addButton()} />
                        <Button title="Description" onPress={() => this.setState({ isDescriptionDialogVisable: true })} />
                        {this.removeButton}
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
const styles = StyleSheet.create({ // **OBS!** Många styles används inte RENSA SEN!!!
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
