import React from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, IconMenu } from 'material-ui';
import ArchiveArticleRequest from '../../../../../../Requests/ArchiveArticleRequest';
import { ArticleDialogTopbarShareMenuItem } from 'components';
import GetUserListsRequest from '../../../../../../Requests/GetUserListsRequest';
import GetGroupListsRequest from '../../../../../../Requests/GetGroupListsRequest';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      listItems: []
    };

    this.remove = this.remove.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    const getListsCallback = (response) => {
      const listObjs = response.lists;
      this.setState({
        listItems: listObjs
          .filter((obj) => !obj.archived)
          .map((listObject) => <ArticleDialogTopbarShareMenuItem
            name={listObject.name}
            articleId={this.props.article_id}
            baseListId={this.props.list_id}
            targetListId={listObject.id}
            group={this.props.group}
            groupId={this.props.groupId}
            close={this.props.close}
            refreshPage={this.props.refreshPage}
          />)
      });
    };

    if (this.props.group === 'true') {
      GetGroupListsRequest.get(this.props.groupId, getListsCallback);
    } else {
      GetUserListsRequest.get(getListsCallback);
    }
  }

  remove() {
    // send the delete request
    ArchiveArticleRequest.delete(
      this.props.list_id,
      this.props.article_id,
      this.props.close
    );
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle
            text={this.props.title}
            style={{ color: 'black', textOverflow: 'clip ellipsis', width: '500px' }}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <IconMenu iconButtonElement={<IconButton tooltip="Copy To Other Lists"><ContentCopy /></IconButton>}>
            {this.state.listItems}
          </IconMenu>
          <IconButton name="RemoveButton" tooltip="Remove" onTouchTap={this.remove}><Delete /></IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

TopBar.propTypes = {
  // title of the article
  title: React.PropTypes.string.isRequired,

  // list id
  list_id: React.PropTypes.string.isRequired,

  // article id
  article_id: React.PropTypes.string.isRequired,

  // callback function to close the article
  close: React.PropTypes.func.isRequired,

  group: React.PropTypes.string,

  groupId: React.PropTypes.string,

  refreshPage: React.PropTypes.func.isRequired
};
