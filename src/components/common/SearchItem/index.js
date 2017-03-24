import React from 'react';
import { MenuItem } from 'material-ui';

class SearchItem extends React.Component {
  render() {
    return (
      <MenuItem
        primaryText={this.props.title}
      />
    );
  }
}

SearchItem.propTypes = {
  articleId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

export default SearchItem;
