import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import Axios from 'axios'
import cookie from 'react-cookie'
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class CreateList extends React.Component {
  constructor(props){
    super(props);
    this.state = {open:false, name:"", requireName:"required"};

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.styles = {
      float:{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        width: '50px',
        height: '50px',
      }
    }
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
    const that = this;
    //todo: remove the hardcoded part
    const host = window.location.host;
    const token = cookie.load('Access-Token');
    const listId = this.props.listId;

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {
        "Access-Token":token,
        "Content-Type":"application/json",
      }
    });

    if (this.props.group === 'true'){
      that.path='/group/list';
      that.body={name:this.state.name,group_id:this.props.groupId};
    } else {
      that.path = '/user/list';
      that.body = {name: this.state.name};
    }

      http.post(that.path, that.body)
        .then((respond) => {
          if (respond.status === 200) {
            this.props.reloadCallback();
            this.setState({name: ''});
            this.setState({requireName: "required"})
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
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
        <FloatingActionButton style={this.styles.float} onTouchTap={this.handleOpen}><ContentAdd/></FloatingActionButton>
        <Dialog open={this.state.open} title="Create List" actions={actions} autoScrollBodyContent={true}>
          <TextField hintText="Required" fullWidth={true} hintStyle={{color: deepOrangeA400}} autoFocus floatingLabelText="List Name" errorText={this.state.requireName} onChange={this.handleChange}/>
        </Dialog>
      </li>
    );
  }
}
