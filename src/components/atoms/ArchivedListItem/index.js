import React from 'react';
import { ListItem, Checkbox } from 'material-ui';

class ArchivedListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(event, isInputChecked) {
    if (isInputChecked) {
      this.props.selectedAction(true, this.props.list_id);
    } else {
      this.props.selectedAction(false, this.props.list_id);
    }
  }

  render() {
    const CheckBox = <Checkbox onCheck={this.handleCheck} />;
    return (
      <ListItem
        primaryText={this.props.name}
        leftCheckbox={CheckBox}
      />

    );
  }
}

ArchivedListItem.propTypes = {
  // article title
  name: React.PropTypes.string.isRequired,

  // article id
  list_id: React.PropTypes.string.isRequired,

  // callback action, if this article is selected/un-selected
  selectedAction: React.PropTypes.func.isRequired
};

export default ArchivedListItem;
