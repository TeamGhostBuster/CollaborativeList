import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import Axios from 'axios'
import cookie from 'react-cookie'

export default class CreateList extends React.Component {
  constructor(props){
    super(props);
    this.state = {open:false, name:"", requireName:"required"};

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({name :event.target.value});
    if (event.target.value === ""){
      this.setState({requireName:"require"});
    } else {
      this.setState({requireName:""});
    }
  }

  handleOpen() {
    this.setState({open:true});
  }

  handleClose(){
    this.setState({name:''});
    this.setState({open:false})
  }

  handleSubmit(){
    if (this.state.name !== ''){
      this.submitToServer()
      this.setState({open:false})
    } else {
      console.log("name field is empty")
    }

  }

  submitToServer(){
    //todo: remove the hardcoded part
    const host = window.location.host;
    const token = cookie.load('Access-Token');
    const listId = this.props.listId;

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {
        "Access-Token":"michaellam.lzc",
        "Content-Type":"application/json",
      }
    });

    http.post('/user/list', {
        name:this.state.name
      })
      .then((respond) =>{
        if (respond.status===200){
          this.props.reloadCallback();
          this.setState({name:''});
          this.setState({requireName:"required"})
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status===401){
          console.log("invalid token");
        } else {
          console.log("invalid request of lists info1111");
        }
      })
  }

  render() {
    const actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.handleClose} />,
      <FlatButton label='Submit' primary={true} onTouchTap={this.handleSubmit} />
    ];
    return (
      <li style={{listStyle:'none'}}>
        <RaisedButton label="Create LIST!" fullWidth={true} primary={true} icon={<ContentAdd/>} onTouchTap={this.handleOpen}/>
        <Dialog open={this.state.open} title="Create List" actions={actions}>
          <TextField hintText="Required" hintStyle={{color: deepOrangeA400}} floatingLabelText="List Name" errorText={this.state.requireName} onChange={this.handleChange}/>
        </Dialog>
      </li>
    );
  }
}
