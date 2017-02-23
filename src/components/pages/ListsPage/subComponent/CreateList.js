import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Axios from 'axios'
import cookie from 'react-cookie'

export default class CreateList extends React.Component {
  constructor(props){
    super(props);
    this.state = {open:false};
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({open:true});
  }

  handleClose(){
    this.setState({open:false})
  }

  handleSubmit(){

  }


  render() {
    const actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.handleClose} />,
      <FlatButton label='Submit' primary={true} onTouchTap={this.handleSubmit} />
    ];
    return (
      <li style={{listStyle:'none'}}>
        <RaisedButton label="Create LIST!" fullWidth={true} primary={true} icon={<ContentAdd/>} onClick={this.addList}/>
        <Dialog open={this.handleOpen} title="Create List" actions={}/>
      </li>
    );
  }
}
