
import React from 'react'
import Group from './Group'
import CreateGroup from './CreateGroup'


export default class LowerSection extends React.Component {
  constructor(){
    super();
    this.groups = [];
    this.getGroups = this.getGroups.bind(this);
  }

  getGroups(){

  }

  render() {
    return (
      <div>
        <ul>
          {this.groups}
          <CreateGroup/>
        </ul>
      </div>
    );
  }
}
