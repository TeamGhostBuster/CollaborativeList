import React from 'react';
// import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
// import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Up from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton';
import VoteRequest from '../../../../../Requests/VoteRequest';

export default class VoteButton extends React.Component {
  constructor(action, id, refresh, groupId, listId) {
    // props: { action: "up" or "down", id: article id, refresh: refresh the list, groupId, listId}
    super(action, id, refresh, groupId, listId);
    this.icon = this.props.action === 'up' ? <Up /> : <Down />;
    this.name = this.props.action === 'up' ? 'Upvote' : 'Downvote';

    this.vote = this.vote.bind(this);

    this.styles = {
      smallIcon: {
        padding: '0', width: '20px', height: '20px'
      }
    };
  }

  vote() {
    // send out the request
    VoteRequest.post(
      this.props.action,
      this.props.groupId,
      this.props.listId,
      this.props.id,
      this.props.refresh
    );
  }

  render() {
    return (
      <IconButton name={this.name} iconStyle={this.styles.smallIcon} onTouchTap={this.vote}>
        {this.icon}
      </IconButton>
    );
  }
}

VoteButton.propTypes = {
  // 'up' or 'down'
  action: React.PropTypes.string.isRequired,

  // id of the article
  id: React.PropTypes.string.isRequired,

  // callback function to refresh the parent component
  refresh: React.PropTypes.func.isRequired,

  // group id of the article
  groupId: React.PropTypes.string.isRequired,

  // list if of the article
  listId: React.PropTypes.string.isRequired
};
