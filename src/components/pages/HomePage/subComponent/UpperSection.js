
import React from 'react'
import {browserHistory} from 'react-router'

//import Button from 'react-toolbox/lib/button'

export default class UpperSection extends React.Component {
 constructor() {
    super();
    this.goToLists = this.goToLists.bind(this);
  }


  goToLists(){
    browserHistory.push('/personal')
  }

  render() {

    return (
      <div style={{border: 'solid 1px', width:'350px', height:'200px', textAlign:'center'}} onClick={this.goToLists}>
        Personal Lists
      </div>
    );
  }
}
