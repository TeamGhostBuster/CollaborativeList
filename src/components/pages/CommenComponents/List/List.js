import React from 'react';
import ArticleCard from './ListSub/ArticleCard';
import { Card, CardMedia } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import CreateArticle from './ListSub/CreateArticle';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import GetArticlesRequest from '../../../Requests/GetArticlesRequest';
import ArchiveListRequest from '../../../Requests/ArchiveListRequest';
import PartitionDialog from './ListSub/PartitionDialog';
import RenameDialog from './ListSub/RenameDialog';

export default class List extends React.Component {
  constructor() {
    // props: {id: list id, name: list name, reloadCallback:fucntion, group: "true", groupId }
    super();

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

  }

  mergeListClose() {

  }


  /** **********************************************
   *      share list functions
   ************************************************/
  shareToGroup() {

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
          refresh={this.componentWillMount} vote={article.vote_count}
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
      </li>
    );
  }
}
