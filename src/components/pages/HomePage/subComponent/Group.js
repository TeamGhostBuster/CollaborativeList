import React from 'react'

export default class Group extends React.Component {
  constructor() {
    super();
    this.numberOfGroups = 0;
  }

  render() {
    return(
      <div style={{border: 'solid 1px', width:'350px', height:'200px', textAlign:'center'}} onClick={this.goToLists}>
        Personal Lists
      </div>
    );
  }
}
