import React, { Component, useState } from 'react';

let [Goal,setGoal] = useState([
  {name: 'mål', Key: '1'},
  {name: 'tål', Key: '2'},
  {name: 'kål', Key: '3'},
]);
export const GoalContext = React.createContext([Goal, setGoal]);

export default class GoalContextProvider extends Component {
    constructor(props) {
      super();
    }
  
    render() {
      console.log(this.context);
    }
  }