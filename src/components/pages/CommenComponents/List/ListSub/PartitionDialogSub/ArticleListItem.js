import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default class ArticleListItem extends React.Component {
  constructor(title, article_id, selectedAction) {
    super(title, article_id, selectedAction);

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(event, isInputChecked) {
    if (isInputChecked) {
      this.props.selectedAction(true, this.props.article_id);
    } else {
      this.props.selectedAction(false, this.props.article_id);
    }
  }

  render() {
    const CheckBox = <Checkbox onCheck={this.handleCheck} />;
    return (
      <ListItem primaryText={this.props.title} leftCheckbox={CheckBox} className="ListItem" />

    );
  }
}

ArticleListItem.propTypes = {
  // article title
  title: React.PropTypes.string.isRequired,

  // article id
  article_id: React.PropTypes.string.isRequired,

  // callback action, if this article is selected/un-selected
  selectedAction: React.PropTypes.func.isRequired
};
