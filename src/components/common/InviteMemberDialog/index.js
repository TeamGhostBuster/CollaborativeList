import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import ChipInput from 'material-ui-chip-input';
import InviteUsersRequest from '../../Requests/InviteUsersRequest';

class InviteMemberDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      members: []
    };

    // Dialog buttoms actions
    this.actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Invite"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];
  }

  // Handle invitatiion request
  handleSubmit() {
    InviteUsersRequest.post(this.props.groupId, this.state.members, this.handleClose());
  }

  // Handle close dialog event
  handleClose() {
    this.props.close();
  }

  // Handle textfield of chips changes
  handleChange(members) {
    this.setState({
      members
    });
  }

  render() {
    return (
      <Dialog
        title="Invite Member"
        open={this.props.open}
        onRequestClose={this.props.close}
        actions={this.actions}
      >
        <ChipInput
          onChange={(chips) => this.handleChange(chips)}
        />
      </Dialog>
    );
  }
}

InviteMemberDialog.propTypes = {
  // The callback method from the parent component
  close: React.PropTypes.func.isRequired,
  open: React.PropTypes.func.isRequired,
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired
};

export default InviteMemberDialog;
