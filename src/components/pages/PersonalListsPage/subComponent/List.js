import React from 'react'
import ArticleCard from './ListSub/ArticleCard'
import {Card, CardMedia} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import CreateArticle from './ListSub/CreateArticle'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import GetArticlesRequest from '../../../Requests/GetArticlesRequest';
import ArchiveListRequest from '../../../Requests/ArchiveListRequest'

export default class List extends React.Component {
  constructor(){
    // props: {id: list id, name: list name, reloadCallback:fucntion, group: "true", groupId }
    super();

    this.state = {articles:[]};

    this.getArticles = this.getArticles.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.archiveList = this.archiveList.bind(this);

    this.styles = {
      list: {
        width:'300px',
        paddingLeft: '10px',
        paddingRight: '10px'
      },
      articleList: {
        padding:'0'
      }
    }
  }

  componentWillMount(){
    var that = this;
    const cb = (response) => {
      that.setState({articles: response["articles"]})
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

  archiveList(){
    // send the delete request
    ArchiveListRequest.delete(
      this.props.id,
      this.props.group,
      this.props.groupId,
      this.props.reloadCallback
    );

  }

  // list menu buttons
  Menu = (props) =>
    <IconMenu {...props}
      iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Archive" onTouchTap={this.archiveList}/>
    </IconMenu> ;

  render() {
    // make a list of <ArticleCard/>
    const liItems = this.state.articles.map(
      (article) =>
      <ArticleCard key={article['id']} id={article['id']} list_id={this.props.id}
                   title={article['title']} group={this.props.group} groupId = {this.props.groupId}
                   refresh={this.componentWillMount} vote={article['vote_count']}/>
    );

    return(
      <li style={this.styles.list}>
        <Card>
          <CardMedia>
            <AppBar title={this.props.name} titleStyle={{fontSize:'1.3em'}} iconElementLeft={<div/>} iconElementRight={this.Menu()}/>
            <ul style={this.styles.articleList}>
              {liItems}
              <CreateArticle listId={this.props.id} callback={this.componentWillMount} group={this.props.group} groupId={this.props.groupId}/>
            </ul>
          </CardMedia>
        </Card>
      </li>
    );
  }
}