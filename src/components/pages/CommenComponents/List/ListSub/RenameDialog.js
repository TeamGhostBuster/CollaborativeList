import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PutRenameRequest from '../../../../Requests/PutRenameRequest';

export default class RenameDialog extends React.Component {
  constructor(open, close, list_id) {
    // props: {open: bool: list of ids, close: callback function, list_id: string}
    super(open, close, list_id);

    this.state = { name: '', requireName: 'required' };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
    if (event.target.value === '') {
      this.setState({ requireName: 'require' });
    } else {
      this.setState({ requireName: '' });
    }
  }

  handleClose(success) {
    this.setState({ name: '' });
    this.setState({ open: false });
    this.props.close(success);
  }

  handleSubmit() {
    if (this.state.name !== '') {
      const cb = (response) => {
        // close this and refresh this whole list page!
        this.handleClose(true);
      };
      PutRenameRequest.put(this.props.list_id, this.state.name, cb);
    }
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog open={this.props.open} title="Rename List" actions={actions} autoScrollBodyContent>
        <TextField
          hintText="Required" fullWidth
          hintStyle={{ color: '#FF3D00' }} floatingLabelText="New List Name"
          errorText={this.state.requireName} onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

RenameDialog.propTypes = {
  // if the dialog is open
  open: React.PropTypes.bool.isRequired,

  // callback function to close the dialog
  close: React.PropTypes.func.isRequired,

  // the id of the list to be changed
  list_id: React.PropTypes.string.isRequired
};
