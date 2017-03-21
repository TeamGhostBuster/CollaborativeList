import React from 'react';
import { Card, CardActions, CardHeader, CardText, FlatButton } from 'material-ui';
import AcceptInvitationRequest from '../../Requests/AcceptInvitationRequest';
import DenyInvitationRequest from '../../Requests/DenyInvitationRequest';

class InvitationMenuCard extends React.Component {
  // Handle deny invitation request
  handleDeny = () => {
    DenyInvitationRequest.put(this.props.id, this.props.close);
  };

  // Handle accept invitation request
  handleAccept = () => {
    AcceptInvitationRequest.put(this.props.id, this.props.close);
  };

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.groupName}
        />
        <CardText>Inviter: {this.props.inviter}</CardText>
        <CardActions>
          <FlatButton
            label="Deny"
            primary={false}
            onTouchTap={this.handleDeny}
          />
          <FlatButton
            label="Accept"
            primary
            onTouchTap={this.handleAccept}
          />
        </CardActions>
      </Card>
    );
  }
}

InvitationMenuCard.propTypes = {
  id: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string.isRequired,
  groupName: React.PropTypes.string.isRequired,
  inviter: React.PropTypes.string.isRequired,
  close: React.PropTypes.func.isRequired
};

export default InvitationMenuCard;
