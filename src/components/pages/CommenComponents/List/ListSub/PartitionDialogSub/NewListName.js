import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PutPartitionListRequest from '../../../../../Requests/PutPartitionListRequest';

export default class NewListName extends React.Component {
  constructor(open, close, list_id) {
    // props: {open: bool, close: callback function, list_id: string}
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
      const cb = () => {
        // close this and refresh this whole list page!
        this.handleClose(true);
      };
      PutPartitionListRequest.put(this.props.list_id, this.state.name, this.props.articles, cb);
    }
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" className="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" className="Submit" primary onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog open={this.props.open} title="Partiton List" actions={actions} autoScrollBodyContent>
        <TextField
          hintText="Required" fullWidth multiLine={true} id="NewListNameInput"
          hintStyle={{ color: '#FF3D00' }} floatingLabelText="New List Name"
          errorText={this.state.requireName} onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

NewListName.propTypes = {
  // if this dialog is open
  open: React.PropTypes.string.isRequired,

  // callback to close this dialog
  close: React.PropTypes.func.isRequired,

  // list id
  list_id: React.PropTypes.string.isRequired
};
