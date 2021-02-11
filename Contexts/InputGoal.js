
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal, Dimensions } from "react-native";
import { Goal } from '../screens/models/Goal';
import { Progression } from '../screens/models/Progression';
import FireTest, { addGoal, GoalAPI } from '../GoalAPI';
import DialogInput from 'react-native-dialog-input';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import useAndroidRippleForView from 'react-native/Libraries/Components/Pressable/useAndroidRippleForView';



const window = Dimensions.get("window");
export default class InputGoal extends Component {

    state = {
        title: "",
        isDescriptionDialogVisable: false,
        description: "",
        user: {},
        key: "0",
        docID: "",
        isProgModalVisable: false,

        progTitle: "",
        progDescription: "",
        progressions: [],

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
            this.state.docID = item.route.params.id;
            this.removeButton = <Button title="Remove" onPress={() => this.removeGoal()} />;
        } else {//nYT MÅL


        }
        GoalAPI.getAllProgression(this.state.docID)
            .then(progressions => this.setState({
                progressions: progressions.map(doc => {
                    return {
                        name: doc.data().name,
                        description: doc.data().description,
                        count: doc.data().count,
                        id: doc.id,
                    }
                })
            }))


        // GoalAPI.getUser("lhSUEsi6xIWH9xmD569B").then(user =>
        //   this.setState({ user: user }, () => this.setState({ key: user.topKey + 1 })));


    }
    addButton() {
        if (this.layout.addButton == "Add") { //add Goal
            GoalAPI.addGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title, this.state.description)).catch(err => console.log(err))

        } else { // save Goal
            GoalAPI.editGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title, this.state.description), this.state.docID)
        }
    }

    sendInput(inputText) {
        this.setState({ description: inputText });
        this.setState({ isDescriptionDialogVisable: false });
    }
    removeGoal() {
        GoalAPI.removeGoal("lhSUEsi6xIWH9xmD569B", this.state.docID);
    }

    addProgression() {
        GoalAPI.addProgression(this.state.docID, new Progression(this.state.progTitle, this.state.progDescription))
    }
    ProgressionPress(progID, countA, i) {
        // this.setState({ description: "88888" });
        GoalAPI.ProgressionCompleted("lhSUEsi6xIWH9xmD569B", this.state.docID, progID, countA);

        let newCountList = this.state.progressions.map(item => {
            if (item.id == progID) {
                ++item.count
            }
            return item;
        })
        this.setState({ progressions: newCountList });
    }

    render() {
        return (
            <View style={styles.back}>
                <View style={styles.mid}>
                    <Text>Goal {this.state.docID}</Text>
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

                    <TouchableOpacity style={styles.addbutton} onPress={() => this.setState({ isProgModalVisable: true })}>
                        <Text>Add progression</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>
                    <ScrollView style={{ backgroundColor: "lime" }}>
                        {this.state.progressions.map((item, i) => {

                            return (
                                <View style={{ backgroundColor: "orange", flexDirection: "row", justifyContent: "flex-end", marginTop: "5%" }} key={i} >
                                    <Pressable android_ripple={{ color: "cyan", radius: 20, borderless: true }} onPress={() => this.ProgressionPress(item.id, item.count, i)} style={{ height: window.height * 0.1, backgroundColor: "lightblue", width: window.height * 0.1, alignSelf: 'center', marginRight: "9%", borderRadius: 15 }} key={i}>

                                        <Text>X </Text>

                                    </Pressable>
                                    <Pressable onPress={() => this.navigation.navigate('GoalPage')} style={styles.goalBox}>

                                        <Text>{item.name} Count:{item.count}, key: {i}</Text>

                                    </Pressable>

                                </View>

                            )
                        })}
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

                <Modal transparent={true} visible={this.state.isProgModalVisable}>
                    <TouchableOpacity style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }} onPress={() => this.setState({ isProgModalVisable: false })}>
                        <View style={{ backgroundColor: "#ffffff", alignSelf: "center", width: "70%", height: "50%", borderRadius: 5 }}>
                            <Text style={{ alignSelf: "center" }}>Teext</Text>
                            <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '56%', marginLeft: "5%", marginBottom: "5%" }}
                                value={this.state.progTitle}
                                placeholder="Progession title..."
                                onChangeText={(value) => this.setState({ progTitle: value })} />

                            <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '80%', marginLeft: "5%" }}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"

                                value={this.state.progDescription}
                                placeholder="Progession description..."
                                onChangeText={(value) => this.setState({ progDescription: value })} />
                            <Button title="Add" onPress={() => this.addProgression()} />

                        </View>
                    </TouchableOpacity>
                </Modal>
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
        width: '60%',
        height: window.height * 0.15,
        alignItems: 'center',
        backgroundColor: 'red',
        //marginTop: '5%',
        justifyContent: 'center',
        //alignSelf: "flex-end",
        marginRight: "5%",
        borderRadius: 8,
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