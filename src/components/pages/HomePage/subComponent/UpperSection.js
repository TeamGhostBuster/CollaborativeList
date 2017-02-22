
import React from 'react'
import {browserHistory} from 'react-router'

//import Button from 'react-toolbox/lib/button'

export default class UpperSection extends React.Component {
 constructor() {
    super();
    this.goToLists = this.goToLists.bind(this);
    // this.length = 0;
    // this.lists = [];
  }
/*
  askForList(callback) {

  }*/

  goToLists(){
    browserHistory.push('/personal')
  }

  render() {
   /* const cb = (response) => {

    };
    askForList(cb);

    const LIs = this.lists.map((list) => <List id={list}/>);
    return (
      <div>
        <ul>
          <Library/>
          {LIs}
          <CreateList/>
        </ul>
      </div>
    );*/
    return (
      <div style={{border: 'solid 1px', width:'350px', height:'200px', textAlign:'center'}} onClick={this.goToLists}>
        Personal Lists
      </div>
    );
  }
}
