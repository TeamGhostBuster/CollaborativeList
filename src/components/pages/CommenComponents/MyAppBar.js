import React from 'react';
import { AppBar, IconButton } from 'material-ui';
import MenuBtn from 'material-ui/svg-icons/Navigation/menu';

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
      />
    );
  }
}

export default MyAppBar;
