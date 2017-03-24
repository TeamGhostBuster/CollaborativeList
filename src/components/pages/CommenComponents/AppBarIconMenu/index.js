import React from 'react';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import { InviteMemberDialog } from 'components';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RetrieveArchivedListDialog from '../RetrieveArchivedListDialog';
import SearchBar from '../../SearchPage/subComponent/SearchBar';

class AppBarIconMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      retrieveListDialog: false,
      inviteMemberDialog: false,
      open: false
    };

    // Bind function
    this.retrieveArchivedListDialogOpen = this.retrieveArchivedListDialogOpen.bind(this);
    this.retrieveArchivedListDialogClose = this.retrieveArchivedListDialogClose.bind(this);
    this.inviteMemberDialogOpen = this.inviteMemberDialogOpen.bind(this);
    this.inviteMemberDialogClose = this.inviteMemberDialogClose.bind(this);
  }

  // Dialog event handling
  retrieveArchivedListDialogOpen() {
    this.setState({
      retrieveListDialog: <RetrieveArchivedListDialog
        open
        close={this.retrieveArchivedListDialogClose}
        pageType={this.props.pageType}
        groupId={this.props.groupId}
        reloadCallback={this.props.reloadCallback}
      />
    });
  }

  retrieveArchivedListDialogClose(success) {
    this.setState({ retrieveListDialog: false });

    if (success) {
      this.props.reloadCallback();
    }
  }

  inviteMemberDialogOpen() {
    this.setState({
      inviteMemberDialog: <InviteMemberDialog
        open={this.inviteMemberDialogOpen}
        close={this.inviteMemberDialogClose}
        pageType={this.props.pageType}
        groupId={this.props.groupId}
        reloadCallback={this.props.reloadCallback}
      />
    });
  }

  inviteMemberDialogClose(success) {
    this.setState({ inviteMemberDialog: false });

    if (success) {
      this.props.reloadCallback();
    }
  }

  // Conditional rendering for personal list and group list
  MenuItems = () => {
    const pageType = this.props.pageType;
    // For personal list page
    if (pageType === 'personal') {
      return (
        <div>
          <IconMenu
            className="AppBarIconMenu"
            iconButtonElement={<IconButton><MoreVertIcon color={'#ffffff'} /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onTouchTap={this.retrieveArchivedListDialogOpen}>Trash</MenuItem>
          </IconMenu>
        </div>);
    } else {
      // For group list page
      return (
        <div>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon color={'#ffffff'} /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onTouchTap={this.retrieveArchivedListDialogOpen}>Trash</MenuItem>
            <MenuItem onTouchTap={this.inviteMemberDialogOpen}>Invite</MenuItem>
          </IconMenu>
        </div>);
    }
  };

  render() {
    return (
      <div>
        {this.MenuItems()}
        {this.state.retrieveListDialog}
        {this.state.inviteMemberDialog}
      </div>
    );
  }
}

AppBarIconMenu.propTypes = {
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired
};

export default AppBarIconMenu;
