import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default class ShareGroupListItem extends React.Component {
  constructor(name, id, selectedAction) {
    super(name, id, selectedAction);

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(event, isInputChecked) {
    this.props.selectedAction(isInputChecked, this.props.id);
  }

  render() {
    const CheckBox = <Checkbox onCheck={this.handleCheck} />;
    return (
      <ListItem primaryText={this.props.name} leftCheckbox={CheckBox} />

    );
  }
}

ShareGroupListItem.propTypes = {
  // group name
  name: React.PropTypes.string.isRequired,

  // group id
  id: React.PropTypes.string.isRequired,

  // callback action, if this article is selected/un-selected
  selectedAction: React.PropTypes.func.isRequired
};
