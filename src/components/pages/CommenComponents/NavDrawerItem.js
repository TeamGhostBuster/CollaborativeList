import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

class NavDrawerItem extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToListPage = this.redirectToListPage.bind(this);
  }

  redirectToListPage() {
    this.props.onDrawerClose();
    browserHistory.push({
      pathname: '/group',
      query: {
        id: this.props.id,
        name: this.props.name
      }
    });
  }

  render() {
    return (
      <MenuItem onTouchTap={this.redirectToListPage}>
        {this.props.name}
      </MenuItem>
    );
  }
}

NavDrawerItem.propTypes = {
  onDrawerClose: React.PropTypes.func
};

export default NavDrawerItem;
