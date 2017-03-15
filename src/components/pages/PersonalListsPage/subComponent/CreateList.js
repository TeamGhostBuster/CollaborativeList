import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CreateListRequest from '../../../Requests/CreateListRequest'

export default class CreateList extends React.Component {
  constructor(reloadCallback){
    // props: reloadCallback, group, groupId
    super(reloadCallback);
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
      this.submitToServer();
      this.setState({open:false})
    } else {
      console.log("name field is empty")
    }

  }

  submitToServer(){

    if (this.props.group === 'true'){
      this.body={name:this.state.name,group_id:this.props.groupId};
    } else {
      this.body = {name: this.state.name};
    }

    const callback = (respond) => {
      if (respond.status === 200) {
        this.props.reloadCallback();
        this.setState({name: ''});
        this.setState({requireName: "required"})
      }
    };

    CreateListRequest.post(this.props.group,this.body,callback)
  }


  render() {
    // actions on the bottom of the dialog
    const actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.handleClose} />,
      <FlatButton label='Submit' primary={true} onTouchTap={this.handleSubmit} />
    ];

    return (
      <li style={{listStyle:'none'}}>
        <FloatingActionButton style={this.styles.float} onTouchTap={this.handleOpen}>
          <ContentAdd/>
        </FloatingActionButton>
        <Dialog open={this.state.open} title="Create List" actions={actions} autoScrollBodyContent={true}>
          <TextField hintText="Required" fullWidth={true}
                     hintStyle={{color: deepOrangeA400}} floatingLabelText="List Name"
                     errorText={this.state.requireName} onChange={this.handleChange}>
          </TextField>
        </Dialog>
      </li>
    );
  }
}
