import React from 'react';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RetrieveArchivedListDialog from '../RetrieveArchivedListDialog';
import SearchBar from '../../SearchPage/subComponent/SearchBar';

class AppBarIconMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      retrieveListDialog: false,
      open: false
    };

    // Bind function
    this.retrieveArchivedListDialogOpen = this.retrieveArchivedListDialogOpen.bind(this);
    this.retrieveArchivedListDialogClose = this.retrieveArchivedListDialogClose.bind(this);
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

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onTouchTap={this.retrieveArchivedListDialogOpen}>Trash</MenuItem>
          <MenuItem href="/search">Search</MenuItem>
        </IconMenu>
        {this.state.retrieveListDialog}
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
