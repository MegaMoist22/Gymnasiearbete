import React , { Component ,View, Text } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
 
//let abdulla = "abdullo"
// export function AddTest(){
//     console.log("MEEEH");
//     let meh = "meho"
//     firebase.firestore().collection('users').add({
//         name: abdulla,
//     });
    
// }
// export function getTest(){
//     let userList = await firebase.firestore().collection('users').get()

//     return userList;
// }

//const userDoc = firebase.firestore().collection("users").doc("lhSUEsi6xIWH9xmD569B").get();
export default class FireTest extends Component {
    constructor(props){
        super(props);
        this.getUser();
    }
    getUser = async () => {
        const userDoc = await firebase.firestore().collection("users").doc("lhSUEsi6xIWH9xmD569B").get();
        console.log(userDoc);
    }
    render() {
        return(
            <View>
                <Text>aa</Text>
            </View>
        );
    }

}
