import React from 'react';
import { AppBar, IconButton } from 'material-ui';
import MenuBtn from 'material-ui/svg-icons/navigation/menu';
import SearchBar from '../SearchPage/subComponent/SearchBar';

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
        iconElementRight={
          <SearchBar/>
        }
      />
    );
  }
}

export default MyAppBar;
