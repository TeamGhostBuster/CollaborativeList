
import React from 'react'
import Group from './Group'
import CreateGroup from './CreateGroup'


export default class LowerSection extends React.Component {
  constructor(){
    super();
    this.state = {groups:[]};
    this.getGroups = this.getGroups.bind(this);
  }

  componentWillMount() {
    var that = this;
    const cb = (response) => {
      console.log(response)
      const listObjs = response['lists'];
      this.setState({lists:listObjs.map((listObject) =>
              <List key={listObject['id']} id={listObject['id']} name={listObject['name']} />)})
    };
    this.getLists(cb);
  }

  getGroups(){

  }

  render() {
    return (
      <div>
          {this.groups}
          Group
          <CreateGroup/>
      </div>
    );
  }
}
