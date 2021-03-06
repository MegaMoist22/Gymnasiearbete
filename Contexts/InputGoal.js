
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal, Dimensions, } from "react-native";
import { Goal } from '../screens/models/Goal';
import { Progression } from '../screens/models/Progression';
import FireTest, { addGoal, GoalAPI } from '../GoalAPI';
import DialogInput from 'react-native-dialog-input';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import useAndroidRippleForView from 'react-native/Libraries/Components/Pressable/useAndroidRippleForView';

import { Slider } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'

import { createStackNavigator } from '@react-navigation/stack';
import moment from "moment";

const window = Dimensions.get("window");
export default class InputGoal extends Component {

    state = {
        title: "",
        isDescriptionDialogVisable: false,//ta bort gammal
        description: "",
        user: {},
        key: "0",
        docID: "",
        isGoalModalVisable: false,
        isProgModalVisable: false,
        isProgEditModalVisable: false,
        isDaysModalVisible: false,
        sliderVal: 0,
        activeProgIndex: 0,
        activeProgID: "",

        progTitle: "",
        progDescription: "",
        progressions: [],
        ProgNameVar: "LözXD",

        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        checked6: false,
        checked7: false,
        days: [],

    }
    ProgressionPositions = [];
    layout = {
        addButton: "Add",

    }
    removeButton = null;
    StatsButton = null;

    constructor(item) {
        super();
        this.navigation = item.navigation;
        // console.log("---------------oooooooooooooooooooooooooooooooooo_______________");
        //console.log(item.route.params);
        if (item.route.name == "Goal Page") {
            this.layout.addButton = "Save";
            this.state.title = item.route.params.name;
            this.state.description = item.route.params.description;
            this.state.docID = item.route.params.id;
            // this.removeButton = <Button title="Remove" onPress={() => this.removeGoal()} />;

            this.removeButton = <TouchableOpacity style={styles.TopButtonRow} onPress={() => this.removeGoal()}>
                <Text style={{ color: "white", }}>Remove</Text>
            </TouchableOpacity>;
            //this.StatsButton = <Button title="Statso" onPress={() => this.navigation.navigate('Stats', { Data: item.route.params, progressions: this.state.progressions, })} />;

            this.StatsButton =
                <TouchableOpacity style={styles.MidButtons} onPress={() => this.navigation.navigate('Stats', { Data: item.route.params, progressions: this.state.progressions, })}>
                    <Text style={{ color: "white", }}>Stats</Text>
                </TouchableOpacity>;


            this.ProgmodalTest =
                <TouchableOpacity style={styles.addProgression} onPress={() => this.setState({ isProgModalVisable: true })}>
                    <Text style={{ color: "white", }}>Add Sub-Goal</Text>
                </TouchableOpacity>
            // console.log("cCcCcCCCCcCcCC");
            //console.log(item.route.params.days);
            this.state.checked1 = item.route.params.days[0];
            this.state.checked2 = item.route.params.days[1];
            this.state.checked3 = item.route.params.days[2];
            this.state.checked4 = item.route.params.days[3];
            this.state.checked5 = item.route.params.days[4];
            this.state.checked6 = item.route.params.days[5];
            this.state.checked7 = item.route.params.days[6];
        } else {//nYT MÅL

        }
        GoalAPI.getAllProgression(this.state.docID)
            .then(progressions => {
                this.setState({
                    progressions: progressions.map(doc => {
                        return {
                            name: doc.data().name,
                            description: doc.data().description,
                            count: doc.data().count,
                            id: doc.id,
                            position: doc.data().position,
                            logBook: doc.data().logBook,
                        }
                    })
                });

                this.ProgressionPositions = this.state.progressions;
                // console.log(this.ProgressionPositions);
            })

        //  this.Absogo88888 = this.state.progressions, console.log(this.Absogo)

        // console.log(this.Absogo);
        // GoalAPI.getUser("lhSUEsi6xIWH9xmD569B").then(user =>
        //   this.setState({ user: user }, () => this.setState({ key: user.topKey + 1 })));

    }
    addButton() {
        if (this.layout.addButton == "Add") { //add Goal
            let days = [this.state.checked1, this.state.checked2, this.state.checked3, this.state.checked4, this.state.checked5, this.state.checked6, this.state.checked7]
            GoalAPI.addGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title, this.state.description, days)).catch(err => console.log(err))
            this.navigation.navigate('Goals');

        } else { // save Goal
            let days = [this.state.checked1, this.state.checked2, this.state.checked3, this.state.checked4, this.state.checked5, this.state.checked6, this.state.checked7]
            GoalAPI.editGoal("lhSUEsi6xIWH9xmD569B", new Goal(this.state.title, this.state.description, days), this.state.docID)
            this.navigation.navigate('Goals');
        }
    }

    sendInput(inputText) {
        this.setState({ description: inputText });
        this.setState({ isDescriptionDialogVisable: false });
    }
    removeGoal() {
        GoalAPI.removeGoal("lhSUEsi6xIWH9xmD569B", this.state.docID);
        this.navigation.navigate('Goals');
    }

    addProgression() {
        GoalAPI.addProgression(this.state.docID, new Progression(this.state.progTitle, this.state.progDescription, this.state.sliderVal));

        GoalAPI.getAllProgression(this.state.docID)
            .then(progressions => {
                this.setState({
                    progressions: progressions.map(doc => {
                        return {
                            name: doc.data().name,
                            description: doc.data().description,
                            count: doc.data().count,
                            id: doc.id,
                            position: doc.data().position,
                            logBook: doc.data().logBook,
                        }
                    })
                });

                this.ProgressionPositions = this.state.progressions;
                // console.log(this.ProgressionPositions);
            })
    }
    uppdateProgression() {
        GoalAPI.EditProgression("lhSUEsi6xIWH9xmD569B", this.state.docID, this.state.activeProgID, this.state.progressions[this.state.activeProgIndex].name, this.state.progressions[this.state.activeProgIndex].description, this.state.progressions[this.state.activeProgIndex].position);
    }
    ProgressionPress(progID, countA, i) {
        // this.setState({ description: "88888" });
        // if (this.state.progressions[i]) {

        // }

        let daily = {
            date: moment().format('YYYY-MM-DD'),
            count: 1,
        };

        let TESTLOG = [...this.state.progressions[i].logBook];
        const logBook = this.state.progressions[i].logBook;
        const lastItem = logBook[logBook.length - 1];
        if (lastItem && lastItem.date == daily.date.toString()) {
            ++TESTLOG[TESTLOG.length - 1].count;

        } else {//om den är ny
            TESTLOG.push(daily);
        }

        GoalAPI.ProgressionCompleted("lhSUEsi6xIWH9xmD569B", this.state.docID, progID, countA, TESTLOG);

        let newCountList = this.state.progressions.map(item => {
            if (item.id == progID) {
                ++item.count;
                item.logBook = TESTLOG;
            }
            return item;
        })
        this.setState({ progressions: newCountList });

        console.log(this.state.progressions[i].name);
        console.log(this.state.progressions[i].description);
        console.log(this.state.progressions[i].position);

    }

    ProgressionEdit(i, ProgID) {

        this.setState({ activeProgIndex: i });
        this.setState({ ProgNameVar: this.state.progressions[i].name })
        this.setState({ isProgEditModalVisable: true });
        this.setState({ sliderVal: this.ProgressionPositions[i].position });
        this.setState({ activeProgID: ProgID });

    }

    removeProgression() {
        GoalAPI.removeProgression("lhSUEsi6xIWH9xmD569B", this.state.docID, this.state.activeProgID);

        GoalAPI.getAllProgression(this.state.docID)
            .then(progressions => {
                this.setState({
                    progressions: progressions.map(doc => {
                        return {
                            name: doc.data().name,
                            description: doc.data().description,
                            count: doc.data().count,
                            id: doc.id,
                            position: doc.data().position,
                            logBook: doc.data().logBook,
                        }
                    })
                });

                this.ProgressionPositions = this.state.progressions;
                // console.log(this.ProgressionPositions);
            })

    }

    render() {
        return (
            <View style={styles.back}>
                <View style={styles.mid}>
                    {/* <Text>Goal {this.state.docID}</Text> */}
                    <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '30%', borderRadius: 4, marginTop: "2%", }}
                        value={this.state.title}
                        placeholder="Goal title..."
                        onChangeText={(value) => this.setState({ title: value })} />

                    <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>

                        {/* <Button title={this.layout.addButton} onPress={() => this.addButton()} /> */}

                        <TouchableOpacity style={styles.TopButtonRow} onPress={() => this.addButton()}>
                            <Text style={{ color: "white", }}>{this.layout.addButton}</Text>
                        </TouchableOpacity>

                        {/* <Button title="Description" onPress={() => this.setState({ isGoalModalVisable: true })} /> */}
                        <TouchableOpacity style={styles.TopButtonRow} onPress={() => this.setState({ isGoalModalVisable: true })}>
                            <Text style={{ color: "white", }}>Description</Text>
                        </TouchableOpacity>
                        {this.removeButton}
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        {/* <Button title="Days" onPress={() => this.setState({ isDaysModalVisible: true })} /> */}
                        <TouchableOpacity style={styles.MidButtons} onPress={() => this.setState({ isDaysModalVisible: true })}>
                            <Text style={{ color: "white", }}>Days</Text>
                        </TouchableOpacity>
                        {this.StatsButton}

                    </View>

                    {/* <TouchableOpacity style={styles.addProgression} onPress={() => this.setState({ isProgModalVisable: true })}>
                        <Text style={{ color: "white", }}>Add progression</Text>
                    </TouchableOpacity> */}
                    {this.ProgmodalTest}

                </View>

                <View style={styles.bottom}>
                    <ScrollView style={{ backgroundColor: "white" }}>
                        {this.state.progressions.sort((a, b) => a.position - b.position).map((item, i) => {

                            return (
                                <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "flex-end", marginTop: "5%" }} key={i} >
                                    <Pressable android_ripple={{ color: "cyan", radius: 50, borderless: true, }} onPress={() => this.ProgressionPress(item.id, item.count, i)} style={{ height: window.height * 0.1, backgroundColor: "#61DBFF", width: window.height * 0.1, alignSelf: 'center', marginRight: "9%", borderRadius: 15, alignItems: 'center', justifyContent: 'center', }} key={i}>

                                        <Text style={{ color: "white", fontSize: 20 }}>{item.count}</Text>

                                    </Pressable>
                                    <Pressable onPress={() => this.ProgressionEdit(i, item.id)} style={styles.goalBox}>

                                        <Text style={{ color: "white" }}>{item.name} </Text>

                                    </Pressable>

                                </View>

                            )
                        })}
                    </ScrollView>
                </View>

                {/* <DialogInput isDialogVisible={this.state.isDescriptionDialogVisable}
                    title={"Description"}
                    message={"Progession description"}
                    hintInput={"Description..."}
                    initValueTextInput={this.state.description}
                    submitInput={(inputText) => { this.sendInput(inputText) }}
                    closeDialog={() => { this.setState({ isDescriptionDialogVisable: false }) }}>
                </DialogInput> */}

                {/* PopUpp Goal, Title/Description */}
                <Modal transparent={true} visible={this.state.isGoalModalVisable}>
                    <TouchableOpacity style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }} onPress={() => this.setState({ isGoalModalVisable: false })}>
                        <View style={styles.popUpp}>
                            <Text style={{ alignSelf: "center" }}>Description</Text>
                            <TextInput style={styles.modalTextInput1}
                                value={this.state.title}
                                placeholder="Goal title..."
                                onChangeText={(value) => this.setState({ title: value })} />

                            <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '80%', marginLeft: "5%", borderRadius: 5, }}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"

                                value={this.state.description}
                                placeholder="Goal description..."
                                onChangeText={(value) => this.setState({ description: value })} />

                            <Pressable onPress={() => this.addButton()} style={{ backgroundColor: "#DB324D", width: "60%", height: "15%", alignSelf: "center", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: "5%", }} >

                                <Text style={{ color: "white" }}> Save</Text>

                            </Pressable>


                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* PopUpp Progression */}
                <Modal transparent={true} visible={this.state.isProgModalVisable}>
                    <TouchableOpacity style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }} onPress={() => this.setState({ isProgModalVisable: false })}>
                        <View style={{ backgroundColor: "#ffffff", alignSelf: "center", width: "70%", height: "50%", borderRadius: 5 }}>
                            <Text style={{ alignSelf: "center" }}>New Sub-Goal</Text>
                            <TextInput style={styles.modalTextInput1}
                                value={this.state.progTitle}
                                placeholder="Progession title..."
                                onChangeText={(value) => this.setState({ progTitle: value })} />

                            <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '80%', marginLeft: "5%", borderRadius: 5, }}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"

                                value={this.state.progDescription}
                                placeholder="Progession description..."
                                onChangeText={(value) => this.setState({ progDescription: value })} />

                            <Slider style={{ width: '80%', marginLeft: "5%" }}
                                trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                                thumbStyle={{ height: 35, width: 35, }}

                                value={this.state.sliderVal}
                                onValueChange={(sliderVal) => this.setState({ sliderVal })}
                                maximumValue={this.state.progressions.length}
                                minimumValue={0}
                                step={1}

                            />
                            <Text style={{ width: '80%', marginLeft: "5%" }}>Priority: {this.state.sliderVal}</Text>

                            <Pressable onPress={() => this.addProgression()} style={{ backgroundColor: "#DB324D", width: "60%", height: "15%", alignSelf: "center", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: "5%", }} >

                                <Text style={{ color: "white" }}> Add</Text>

                            </Pressable>


                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* EDIT--PopUpp Progression--EDIT */}
                <Modal transparent={true} visible={this.state.isProgEditModalVisable}>
                    <TouchableOpacity style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }} onPress={() => this.setState({ isProgEditModalVisable: false })}>
                        <View style={{ backgroundColor: "#ffffff", alignSelf: "center", width: "70%", height: "50%", borderRadius: 5 }}>
                            <Text style={{ alignSelf: "center" }}>Progression Edit</Text>
                            <TextInput style={styles.modalTextInput1}
                                value={this.state.ProgNameVar}
                                placeholder="Progession title..."
                                onChangeText={(value) => this.setState({ progTitle: value })} />

                            <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: '80%', marginLeft: "5%", borderRadius: 5, }}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"

                                value={this.state.progDescription}
                                placeholder="Progession description..."
                                onChangeText={(value) => this.setState({ progDescription: value })} />

                            <Slider style={{ width: '80%', marginLeft: "5%" }}
                                trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                                thumbStyle={{ height: 35, width: 35, }}

                                value={this.state.sliderVal}
                                onValueChange={(sliderVal) => this.setState({ sliderVal })}
                                maximumValue={this.state.progressions.length}
                                minimumValue={0}
                                step={1}

                            />
                            <Text style={{ width: '80%', marginLeft: "5%" }}>Priority: {this.state.sliderVal}</Text>


                            <Pressable onPress={() => this.uppdateProgression()} style={{ backgroundColor: "#DB324D", width: "60%", height: "15%", alignSelf: "center", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: "5%", }} >

                                <Text style={{ color: "white" }}> Uppdate</Text>

                            </Pressable>
                            <Pressable onPress={() => this.removeProgression()} style={{ backgroundColor: "#DB324D", width: "60%", height: "15%", alignSelf: "center", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: "2%", }} >

                                <Text style={{ color: "white" }}> Remove</Text>

                            </Pressable>

                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* Dagar i veckan */}
                <Modal transparent={true} visible={this.state.isDaysModalVisible}>
                    <TouchableOpacity style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }} onPress={() => this.setState({ isDaysModalVisible: false })}>
                        <View style={styles.popUppDays}>

                            <CheckBox
                                title='Monday'
                                checked={this.state.checked1}
                                onPress={() => this.setState({ checked1: !this.state.checked1 })}

                            />
                            <CheckBox
                                title='Tuesday'
                                checked={this.state.checked2}
                                onPress={() => this.setState({ checked2: !this.state.checked2 })}

                            />
                            <CheckBox
                                title='Wednesday'
                                checked={this.state.checked3}
                                onPress={() => this.setState({ checked3: !this.state.checked3 })}

                            />
                            <CheckBox
                                title='Thursday'
                                checked={this.state.checked4}
                                onPress={() => this.setState({ checked4: !this.state.checked4 })}

                            />

                            <CheckBox
                                title='Friday'
                                checked={this.state.checked5}
                                onPress={() => this.setState({ checked5: !this.state.checked5 })}

                            />
                            <CheckBox
                                title='Saturday'
                                checked={this.state.checked6}
                                onPress={() => this.setState({ checked6: !this.state.checked6 })}

                            />
                            <CheckBox
                                title='Sunday'
                                checked={this.state.checked7}
                                onPress={() => this.setState({ checked7: !this.state.checked7 })}

                            />


                        </View>
                    </TouchableOpacity>
                </Modal>


            </View>
        );
    }

}
const styles = StyleSheet.create({ // **OBS!** Många styles används inte RENSA SEN!!!
    container: {
        //8A4FFF
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    goalBox: {
        width: '60%',
        height: window.height * 0.15,
        alignItems: 'center',
        backgroundColor: '#60AFFF',
        //marginTop: '5%',
        justifyContent: 'center',
        //alignSelf: "flex-end",
        marginRight: "5%",
        borderRadius: 8,

    },
    mid: {
        //flex: 1,
        backgroundColor: '#FFF',
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
        backgroundColor: 'white',

        //justifyContent: 'center',
    },
    addbutton: {
        //flex: 1,
        backgroundColor: '#DB324D',
        width: '40%',

        alignItems: 'center',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
        marginBottom: '10%',
        //justifyContent: 'center',

    },
    TopButtonRow: {
        //flex: 1,

        backgroundColor: '#DB324D',
        width: '53%',
        height: "90%",
        marginRight: "2%",
        alignItems: 'center',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
        //justifyContent: 'center',

    },
    MidButtons: {
        //flex: 1,
        backgroundColor: '#DB324D',
        width: '40%',
        marginRight: "2%",
        alignItems: 'center',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
        //justifyContent: 'center',

    },
    addProgression: {
        //flex: 1,
        backgroundColor: '#DB324D',
        width: '40%',

        alignItems: 'center',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
        marginBottom: '5%',
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
    popUpp: {
        backgroundColor: "#ffffff",
        alignSelf: "center",
        width: "70%",
        height: "50%",
        borderRadius: 5
    },
    popUppDays: {
        backgroundColor: "#ffffff",
        alignSelf: "center",
        width: "70%",
        height: "70%",
        borderRadius: 5
    },
    modalTextInput1: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '56%',
        marginLeft: "5%",
        marginBottom: "5%",
        borderRadius: 5,
    }
});
