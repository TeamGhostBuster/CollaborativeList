import React from 'react';
import { AppBar, IconButton, IconMenu, MenuItem, Dialog, FlatButton } from 'material-ui';
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
        iconElementRight={<AppBarIconMenu />}
      />
    );
  }
}

export default MyAppBar;
