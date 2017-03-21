import React from 'react';
import { IconButton, Popover, Menu, MenuItem } from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { InvitationMenuCard } from 'components';
import GetPendingInvitationRequest from '../../../Requests/GetPendingInvitationRequest';

class AppBarInvitationMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      invitationCards: []
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  // Callback method for get invitation request
  componentWillMount() {
    const getInvitationCallback = (response) => {
      const invitationObjs = response.invitation;
      this.setState({
        invitationCards: invitationObjs
          .map((invitationObj) => <InvitationMenuCard
            id={invitationObj.id}
            groupId={invitationObj.group.id}
            groupName={`Group: ${invitationObj.group.name}`}
            inviter={`${invitationObj.inviter.first_name} ${invitationObj.inviter.last_name}`}
            close={this.handleRequestClose}
          />)
      });
    };
    console.log('loading');
    GetPendingInvitationRequest.get(getInvitationCallback);
  }

  // Hanlde Popover's tap event
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  // Handloe popover close event
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
    this.props.reloadCallback();
  };

  render() {
    return (
      <div>
        <IconButton onTouchTap={this.handleTouchTap}>
          <ActionInfo color={'#ffffff'} />
        </IconButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {this.state.invitationCards}
          </Menu>
        </Popover>
      </div>
    );
  }
}

AppBarInvitationMenu.propTypes = {
  reloadCallback: React.PropTypes.func.isRequired
};

export default AppBarInvitationMenu;
