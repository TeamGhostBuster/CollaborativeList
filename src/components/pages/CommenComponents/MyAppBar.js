import React from 'react';
import { AppBar, IconButton, IconMenu, MenuItem, Dialog, FlatButton } from 'material-ui';
import MenuBtn from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RetrieveArchivedListDialog from '../CommenComponents/RetrieveArchivedListDialog';

class MyAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      bar: {
        width: '100%'
      } };

    this.state = {
      retrieveListDialog: false
    };

    this.retrieveArchivedListDialogOpen = this.retrieveArchivedListDialogOpen.bind(this);
    this.retrieveArchivedListDialogClose = this.retrieveArchivedListDialogClose.bind(this);
  }

  retrieveArchivedListDialogOpen() {
    this.setState({
      retrieveListDialog: <RetrieveArchivedListDialog
        open={true}
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
      <AppBar
        style={this.styles.bar}
        title={this.props.title}
        iconElementLeft={
          <IconButton onTouchTap={this.props.openDrawer}>
            <MenuBtn color={'#ffffff'} />
          </IconButton>
        }
        iconElementRight={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={this.retrieveArchivedListDialogOpen}>Trash</MenuItem>
            <MenuItem>Whatever</MenuItem>
            {this.state.retrieveListDialog}
          </IconMenu>
        }
      />
    );
  }
}

export default MyAppBar;
