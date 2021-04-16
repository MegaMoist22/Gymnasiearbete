import React, { Component, View, Text } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const firebaseConfig = { //informationen som behövs för firebase
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
            console.log("Firebase Initialized!!");
            this.getAllGoals()
                .then(x => console.log(x.map(doc => doc.data())));
            // console.log(this.getAllGoals());
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
        //return snapshot.docs.map(doc => doc.data());
        return snapshot.docs;
    }
    static async getAllProgression(goalID) {
        const snapshot = await firebase.firestore()
            .collection('users')
            .doc("lhSUEsi6xIWH9xmD569B")
            .collection("goals")
            .doc(goalID)
            .collection("progressions")
            .get();
        return snapshot.docs;
    }

    /*static async getGoal() {
        return await firebase.firestore()
            .collection("users")
            .doc("lhSUEsi6xIWH9xmD569B")
            .collection("goals")
            .get();
    }*/

    static async addGoal(username, goal) {
        await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .add({ ...goal });
    }

    static async getUser(username) { //gammal??
        return (await firebase.firestore()
            .collection("users")
            .doc(username)
            .get())
            .data();
    }
    // static async addTopKey() {
    //     await firebase.firestore()
    //         .collection("users")
    //         .doc(lhSUEsi6xIWH9xmD569B)
    //         .update({
    //             topKey: ++topKey,
    //         });
    //     console.log("GINGODINGO")
    // }
    static async removeGoal(username, goalID) {
        return await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .doc(goalID)
            .delete();
    }

    static async editGoal(username, goal, goalID) {
        await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .doc(goalID)
            .set({ ...goal });
    }

    static async ProgressionCompleted(username, goalID, progID, countOld, testLog) {
        await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .doc(goalID)
            .collection("progressions")
            .doc(progID)
            .update({
                count: ++countOld,
                logBook: testLog,
            });

    }
    static async EditProgression(username, goalID, progID, name, description, position) {
        await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .doc(goalID)
            .collection("progressions")
            .doc(progID)
            .update({
                name: name,
                description: description,
                position: position,
            });

    }
    static async removeProgression(username, goalID, progID) {
        await firebase.firestore()
            .collection("users")
            .doc(username)
            .collection("goals")
            .doc(goalID)
            .collection("progressions")
            .doc(progID)
            .delete();
        console.log("----------------------GIIIGOOO");
    }

}
