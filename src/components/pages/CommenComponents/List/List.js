import React from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CreateArticle from './ListSub/CreateArticle';
import ArticleCard from './ListSub/ArticleCard';
import GetArticlesRequest from '../../../Requests/GetArticlesRequest';
import ArchiveListRequest from '../../../Requests/ArchiveListRequest';
import PartitionDialog from './ListSub/PartitionDialog';
import RenameDialog from './ListSub/RenameDialog';
import MergeListDialog from './ListSub/MergeListDialog';
import ShareListDialog from './ListSub/ShareListDialog';

export default class List extends React.Component {
  constructor(props) {
    // props: {id: list id, name: list name, reloadCallback:fucntion, group: "true", groupId }
    super(props);

    this.state = { articles: [], partitionDialog: false, renameDialog: false, mergeDialog: false, shareDialog: false };

    this.getArticles = this.getArticles.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.archiveList = this.archiveList.bind(this);
    this.renameList = this.renameList.bind(this);
    this.renameListClose = this.renameListClose.bind(this);
    this.partitionList = this.partitionList.bind(this);
    this.partitionListClose = this.partitionListClose.bind(this);
    this.mergeList = this.mergeList.bind(this);
    this.mergeListClose = this.mergeListClose.bind(this);
    this.shareToGroup = this.shareToGroup.bind(this);
    this.shareToGroupClose = this.shareToGroupClose.bind(this);
    this.updatePage = this.updatePage.bind(this);

    this.styles = {
      list: {
        width: '300px',
        paddingLeft: '10px',
        paddingRight: '10px'
      },
      articleList: {
        padding: '0'
      }
    };
  }

  componentWillMount() {
    const that = this;
    const cb = (response) => {
      that.setState({ articles: response.articles });
    };
    that.getArticles(cb);
  }

  getArticles(callback) {
    // send the get request
    GetArticlesRequest.get(
      this.props.id,
      this.props.group,
      this.props.groupId,
      callback
    );
  }

  updatePage() {
    console.log('lsdkafjdsaklfsfuckfuckfuck');
    this.componentWillMount();
    this.props.reloadCallback();
  }


  /** **********************************************
   *      archive list functions
   ************************************************/
  archiveList() {
    // send the delete request
    ArchiveListRequest.delete(
      this.props.id,
      this.props.group,
      this.props.groupId,
      this.props.reloadCallback
    );
  }

  /** **********************************************
   *      rename list functions
   ************************************************/
  renameList() {
    this.setState({ renameDialog: <RenameDialog open list_id={this.props.id} close={this.renameListClose} /> });
  }

  renameListClose(success) {
    // close the dialog
    this.setState({ renameDialog: false });

    // if success refresh the whole lists page
    if (success) {
      this.props.reloadCallback();
    }
  }


  /** **********************************************
   *      partition list functions
   ************************************************/
  partitionList() {
    this.setState({
      partitionDialog: <PartitionDialog
        open list_id={this.props.id} close={this.partitionListClose}
        articles={this.state.articles}
      />
    });
  }

  partitionListClose(success) {
    // close the dialog
    this.setState({ partitionDialog: false });

    // if success refresh the whole lists page
    if (success) {
      this.componentWillMount();
      this.props.reloadCallback();
    }
  }


  /** **********************************************
   *      merge list functions
   ************************************************/
  mergeList() {
    this.setState({ mergeDialog: <MergeListDialog open close={this.mergeListClose} list_id={this.props.id} /> });
  }

  mergeListClose(success) {
    // close the dialog
    this.setState({ mergeDialog: false });

    // if success refresh the whole lists page
    if (success) {
      this.componentWillMount();
      this.props.reloadCallback();
    }
  }


  /** **********************************************
   *      share list functions
   ************************************************/
  shareToGroup() {
    this.setState({ shareDialog: <ShareListDialog open list_id={this.props.id} close={this.shareToGroupClose} /> });
  }

  shareToGroupClose() {
    this.setState({ shareDialog: false });
  }

  // list menu buttons
  Menu = (props) =>
    <IconMenu
      {...props}
      iconButtonElement={<IconButton name="ListActionsButton"><MoreVertIcon /></IconButton>}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    >
      <MenuItem primaryText="Rename" onTouchTap={this.renameList} />
      <MenuItem primaryText="Archive" onTouchTap={this.archiveList} />
      <MenuItem primaryText="Partition" onTouchTap={this.partitionList} />
      <MenuItem primaryText="Merge With" onTouchTap={this.mergeList} />
      <MenuItem primaryText="Share To Group" onTouchTap={this.shareToGroup} />
    </IconMenu>;

  render() {
    // make a list of <ArticleCard/>
    const liItems = this.state.articles.map(
      (article) =>
        <ArticleCard
          key={article.id} id={article.id} list_id={this.props.id}
          title={article.title} group={this.props.group} groupId={this.props.groupId}
          refresh={this.componentWillMount} vote={article.vote_count} refreshPage={this.updatePage}
        />
    );

    return (
      <li style={this.styles.list}>
        <Card>
          <CardMedia>
            <AppBar
              title={this.props.name} titleStyle={{ fontSize: '1.3em' }} iconElementLeft={<div />}
              iconElementRight={this.Menu()}
            />
            <ul style={this.styles.articleList}>
              {liItems}
              <CreateArticle
                listId={this.props.id} callback={this.componentWillMount} group={this.props.group}
                groupId={this.props.groupId}
              />
            </ul>
          </CardMedia>
        </Card>
        {this.state.partitionDialog}
        {this.state.renameDialog}
        {this.state.mergeDialog}
        {this.state.shareDialog}
      </li>
    );
  }
}

List.propTypes = {
  // list id
  id: React.PropTypes.string.isRequired,

  // list name
  name: React.PropTypes.string.isRequired,

  // callback funtion to refresh the parent
  reloadCallback: React.PropTypes.func.isRequired,

  // string with value "true" or undefined to tell if this list is a group list
  group: React.PropTypes.string,

  // string of group id, if group==="true"
  groupId: React.PropTypes.string
};
