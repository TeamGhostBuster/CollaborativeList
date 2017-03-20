import React from 'react';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RetrieveArchivedListDialog from '../RetrieveArchivedListDialog/index';


class AppBarIconMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrieveListDialog: false,
      open: false
    };

    this.retrieveArchivedListDialogOpen = this.retrieveArchivedListDialogOpen.bind(this);
    this.retrieveArchivedListDialogClose = this.retrieveArchivedListDialogClose.bind(this);
  }

  retrieveArchivedListDialogOpen() {
    this.setState({
      retrieveListDialog: <RetrieveArchivedListDialog
        open
        close={this.retrieveArchivedListDialogClose}
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
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={this.retrieveArchivedListDialogOpen}>Trash</MenuItem>
        <MenuItem>Whatever</MenuItem>
        {this.state.retrieveListDialog}
      </IconMenu>
    );
  }
}

export default AppBarIconMenu;
