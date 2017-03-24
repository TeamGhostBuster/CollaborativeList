import React from 'react';
import { AppBar, IconButton, Toolbar, ToolbarGroup } from 'material-ui';
import MenuBtn from 'material-ui/svg-icons/navigation/menu';
import SearchPage from 'components';
import AppBarIconMenu from '../CommenComponents/AppBarIconMenu';
import AppBarInvitationMenu from './AppBarInvitationMenu';
import { cyan500 } from 'material-ui/styles/colors';

class MyAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      bar: {
        width: '100%'
      },
      toolbar: {
        background: cyan500,
        paddingBottom: '5px',
      },
      toolbargroup: {
        paddingLeft: '20px'
      } };

    this.rightButtons = (
      <Toolbar style={this.styles.toolbar}>
        <ToolbarGroup>
          <AppBarInvitationMenu
            reloadCallback={this.props.reloadCallback}
          />
          <AppBarIconMenu
            pageType={this.props.pageType}
            groupId={this.props.groupId}
            reloadCallback={this.props.reloadCallback}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    return (
      <AppBar
        style={this.styles.bar}
        title={this.props.title}
        iconElementLeft={
          <IconButton name="drawerButton" onTouchTap={this.props.openDrawer}>
            <MenuBtn color={'#ffffff'} />
          </IconButton>
        }
        iconElementRight={this.rightButtons}
      />
    );
  }
}

MyAppBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired,
  openDrawer: React.PropTypes.func
};


export default MyAppBar;
