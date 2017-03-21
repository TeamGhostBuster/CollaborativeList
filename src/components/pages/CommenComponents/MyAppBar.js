import React from 'react';
import { AppBar, IconButton } from 'material-ui';
import MenuBtn from 'material-ui/svg-icons/navigation/menu';
import AppBarIconMenu from '../CommenComponents/AppBarIconMenu';

class MyAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      bar: {
        width: '100%'
      } };
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
        iconElementRight={<AppBarIconMenu
          pageType={this.props.pageType}
          groupId={this.props.groupId}
          reloadCallback={this.props.reloadCallback}
        />}
      />
    );
  }
}

MyAppBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired
};


export default MyAppBar;
