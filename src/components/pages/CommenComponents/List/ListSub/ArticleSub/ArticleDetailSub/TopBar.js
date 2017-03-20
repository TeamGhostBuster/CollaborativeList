import React from 'react';
import IconButton from 'material-ui/IconButton';
import Share from 'material-ui/svg-icons/social/share';
import Delete from 'material-ui/svg-icons/action/delete';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import ArchiveArticleRequest from '../../../../../../Requests/ArchiveArticleRequest';

export default class TopBar extends React.Component {
  constructor(title, list_id, article_id, close) {
    super(title, list_id, article_id, close);

    this.remove = this.remove.bind(this);
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
          <IconButton name="shareButton" tooltip="Show To Other Lists"><Share /></IconButton>
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
  close: React.PropTypes.func.isRequired
};
