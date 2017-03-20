import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

class NavDrawerPersonalItem extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToPersonalPage = this.redirectToPersonalPage.bind(this);
  }

  redirectToPersonalPage() {
    browserHistory.push('/personal');
  }

  render() {
    return (
      <MenuItem onTouchTap={this.redirectToPersonalPage}>
        Personal List
      </MenuItem>
    );
  }
}

export default NavDrawerPersonalItem;
