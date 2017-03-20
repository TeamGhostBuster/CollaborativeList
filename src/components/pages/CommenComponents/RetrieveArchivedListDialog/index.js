import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

class RetrieveArchivedListDialog extends React.Component {
  constructor(open, close) {
    super(open);

    this.actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose(success) {
    this.props.close(success);
  }

  handleSubmit() {
    // TODO
    console.log('submit');
    this.handleClose(true);
  }

  render() {
    return (
      <Dialog
        title="Retrieve Archived List"
        open={this.props.open}
        actions={this.actions}
        onRequestClose={this.props.close}
      />
    );
  }
}

export default RetrieveArchivedListDialog;
