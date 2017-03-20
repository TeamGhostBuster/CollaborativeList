import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PutPartitionListRequest from '../../../../../Requests/PutPartitionListRequest';
export default class NewListName extends React.Component {
  constructor(open, articles, close, list_id) {
    // props: {open: bool, articles: list of ids, close: callback function, list_id: string}
    super(open, articles, close, list_id);

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
      PutPartitionListRequest.put(this.props.list_id, this.state.name, this.props.articles, cb);
    }
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog open={this.props.open} title="Partiton List" actions={actions} autoScrollBodyContent>
        <TextField
          hintText="Required" fullWidth
          hintStyle={{ color: '#FF3D00' }} floatingLabelText="New List Name"
          errorText={this.state.requireName} onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}
