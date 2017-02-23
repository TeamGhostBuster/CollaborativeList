
import React from 'react'
import {GridTile, RaisedButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class CreateList extends React.Component {
  constructor(props){
    super(props);
    this.addList = this.addList.bind(this);
  }

  addList() {
    browserHistory.push('/createListPage');
  }

  render() {
    return (
      <li style={{listStyle:'none'}}>
        <RaisedButton label="Create LIST!" fullWidth={true} primary={true} icon={<ContentAdd/>} onClick={this.addList}/>
      </li>
    );
  }
}
