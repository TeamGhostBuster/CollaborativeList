import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ArticleDialog from './ArticleSub/ArticleDialog';
import VoteButton from './ArticleSub/VoteButton';

export default class ArticleCard extends React.Component {
  constructor(props) {
    // props: { id: string, title: string, group: bool, groupId, list_id, refresh: function, vote}
    super(props);
    this.state = { open: false };

    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  closeDialog() {
    this.setState({ open: false });
    this.props.refresh();
  }

  openDialog() {
    this.setState({ open: true });
  }

  render() {
    // not factored out because of dependencies
    const cardActions = () =>
      this.props.group !== 'true' ?
        <Toolbar style={{ backgroundColor: 'white' }}>
          <ToolbarGroup firstChild>
            <RaisedButton className="DetailButton" buttonStyle={{ height: '100%' }} label="Details" onTouchTap={this.openDialog} />
          </ToolbarGroup>
        </Toolbar>
        :
        <Toolbar style={{ backgroundColor: 'white' }}>
          <ToolbarGroup firstChild>
            <RaisedButton className="DetailButton" buttonStyle={{ height: '100%' }} label="Details" onTouchTap={this.openDialog} />
          </ToolbarGroup>
          <ToolbarGroup>
            <VoteButton
              id={this.props.id} action="up" refresh={this.props.refresh} groupId={this.props.groupId}
              listId={this.props.list_id} className="UpvoteButton"
            />
            <Chip className="VoteCount" backgroundColor={'#ffffff'}>{this.props.vote}</Chip>
            <VoteButton
              id={this.props.id} action="down" refresh={this.props.refresh} groupId={this.props.groupId}
              listId={this.props.list_id} className="DownvoteButton"
            />
          </ToolbarGroup>
        </Toolbar>;

    return (
      <li style={{ listStyle: 'none', padding: '2%' }}>
        <Card>
          <CardHeader title={this.props.title} />
          <CardText />
          {cardActions()}
        </Card>
        <ArticleDialog
          isOpen={this.state.open} close={this.closeDialog} list_id={this.props.list_id}
          id={this.props.id}
        />
      </li>
    );
  }
}

ArticleCard.propTypes = {
  // article id
  id: React.PropTypes.string.isRequired,

  // title of the article
  title: React.PropTypes.string.isRequired,

  // 'true' or undefined, representing if this is a group article
  group: React.PropTypes.string,

  // if group === 'true', need provide groupId
  groupId: React.PropTypes.string,

  // a vote count string if this is group article
  vote: React.PropTypes.string,

  // need the list id
  list_id: React.PropTypes.string.isRequired,

  // callback function to refresh parent
  refresh: React.PropTypes.func.isRequired,

};
