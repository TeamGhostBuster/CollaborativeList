import React from 'react';
import { MenuItem } from 'material-ui';
import CopyArticleRequest from '../../Requests/CopyArticleRequest';

class ArticleDialogTopbarShareMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.refreshPage();
  }

  handleClick() {
    CopyArticleRequest.post(this.props.baseListId, this.props.targetListId,
    this.props.articleId, this.props.groupId, this.props.group, this.props.refreshPage);
  }

  render() {
    return (
      <MenuItem onTouchTap={this.handleClick}>{this.props.name}</MenuItem>
    );
  }
}

ArticleDialogTopbarShareMenuItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  group: React.PropTypes.string,
  articleId: React.PropTypes.string.isRequired,
  baseListId: React.PropTypes.string.isRequired,
  targetListId: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  close: React.PropTypes.func.isRequired,
  refreshPage: React.PropTypes.func.isRequired
};

export default ArticleDialogTopbarShareMenuItem;
