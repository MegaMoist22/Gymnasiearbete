import React, { Component, useState } from 'react';

const GoalList = [
  {name: 'Pall', key:'1'},
  {name: 'pallo', key:'2'}
];
export const GoalContext = React.createContext(GoalList);

export default class GoalContextProvider extends Component {
    constructor(props) {
      super();
    }
  
    render() {
      console.log(this.context);
    }
  }