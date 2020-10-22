import React, { Component, View, Text } from 'react';
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

export class GoalAPI {
    static init() {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            //firebase.analytics();
            console.log("Firebase Initialized!");
            this.getAllGoals().then(x => console.log(x));
        }
    }

    static async addProgression(goalID, progression) {
        return await firebase.firestore()
            .collection("users")
            .doc("lhSUEsi6xIWH9xmD569B")
            .collection("goals")
            .doc(goalID)
            .collection("progressions")
            .add({ ...progression });
    }

    static async getAllGoals() {
        const snapshot = await firebase.firestore()
            .collection('users')
            .doc("lhSUEsi6xIWH9xmD569B")
            .collection("goals")
            .get();
        return snapshot.docs.map(doc => doc.data());
    }

    static async getGoal() {
        return await firebase.firestore()
            .collection("users")
            .doc("lhSUEsi6xIWH9xmD569B")
            .collection("goals")
            .get();
    }

    static async addGoal(username, goal) {
        await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .add({ ...goal });
    }
}
