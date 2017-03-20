import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import CreateGroupRequest from '../../../Requests/CreateGroupRequest'

export default class CreateGroupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', members: '', description: '', requireName: 'required' };

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.memberChange = this.memberChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.styles = {
      float: {
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        width: '50px',
        height: '50px',
      }
    };
  }

  nameChange(event) {
    this.setState({ name: event.target.value });
    if (event.target.value === '') {
      this.setState({ requireName: 'require' });
    } else {
      this.setState({ requireName: '' });
    }
  }

  memberChange(event) {
    this.setState({ members: event.target.value });
  }

  descriptionChange(event) {
    this.setState({ description: event.target.value });
  }


  handleClose() {
    this.setState({ name: '' });
    this.props.close();
  }

  handleSubmit() {
    if (this.state.name !== '') {
      this.submitToServer();
    } else {
      console.log('name field is empty');
    }
  }

  submitToServer() {
    const cb = ()=>{
      this.props.reloadCallback();
      this.setState({ name: '', members: '', description: '' });
      this.setState({ requireName: 'required' });
      this.handleClose();
    };

    const data = {
      name: this.state.name,
      members: this.state.members,
      description: this.state.description
    };

    CreateGroupRequest.post(data,cb);

  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit} />
    ];
    return (
        <Dialog open={this.props.open} title="Create A Group" actions={actions} autoScrollBodyContent>
          <TextField
            fullWidth multiLine hintText="Required" hintStyle={{ color: deepOrangeA400 }}
            floatingLabelText="Group Name" errorText={this.state.requireName} onChange={this.nameChange}
          /><br />

          <TextField
            fullWidth multiLine hintText="Optional" floatingLabelText="Member"
            onChange={this.memberChange}
          /><br />

          <TextField
            fullWidth multiLine hintText="Optional" floatingLabelText="Description"
            onChange={this.descriptionChange}
          />
        </Dialog>
    );
  }
}

CreateGroupDialog.propTypes = {
  // if the dialog is open
  open: React.PropTypes.bool.isRequired,

  // callback to close the dialog
  close: React.PropTypes.func.isRequired,

  // callback function to reload the parent page
  reloadCallback: React.PropTypes.func.isRequired

};
