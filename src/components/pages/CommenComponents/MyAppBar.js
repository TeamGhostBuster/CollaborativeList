import React from 'react';
import { AppBar, IconButton, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import MenuBtn from 'material-ui/svg-icons/navigation/menu';
import AppBarIconMenu from '../CommenComponents/AppBarIconMenu';
import AppBarInvitationMenu from './AppBarInvitationMenu';
import { cyan500 } from 'material-ui/styles/colors';
import AppBarSearchBox from '../../common/AppBarSearchBox';

class MyAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      bar: {
        width: '100%'
      },
      righttoolbar: {
        background: cyan500,
        paddingBottom: '5px',
      },
      toolbargroup: {
        paddingLeft: '20px'
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        color: '#FFFFFF'
      }
    };

    this.rightButtons = (
      <Toolbar style={this.styles.righttoolbar}>
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
        iconElementLeft={
          <Toolbar style={this.styles.righttoolbar}>

            <ToolbarGroup firstChild>
              <IconButton name="drawerButton" onTouchTap={this.props.openDrawer}>
                <MenuBtn color={'#ffffff'} />
              </IconButton>
              <ToolbarTitle text={this.props.title} style={this.styles.title} />
            </ToolbarGroup>

            <ToolbarGroup>
              <AppBarSearchBox
                pageType={this.props.pageType}
                groupId={this.props.groupId}
                reloadCallback={this.props.reloadCallback}
              />
            </ToolbarGroup>

          </Toolbar>
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
