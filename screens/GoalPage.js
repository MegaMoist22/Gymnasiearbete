
import React, { Component } from 'react';
import { View, Text } from "react-native";
import InputGoal from "../Contexts/InputGoal"

export default class GoalPage extends Component {
    state = {
        goalData: {},
    }
    constructor(item) {
        super();
        this.state.goalData = item;
        console.log(item, " ####!")
    }

    render() {
        return (
            <View>
                <Text>Title: {this.state.goalData.route.params.name}</Text>
                <Text>description: {this.state.goalData.route.params.description}</Text>
            </View>
        )

    }
}