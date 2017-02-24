
import React from 'react'
import {browserHistory} from 'react-router'
import cookie from 'react-cookie'
import ArticleCard from './ArticleCard'
import Axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import CreateArticle from './CreateArticle'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


export default class List extends React.Component {
  constructor(){
    super();
    this.getArticles = this.getArticles.bind(this);
    this.state = {articles:[]};
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
    //todo: undo hardcode
    //const host = "http://"+window.location.host;
    const host = "https://api.vfree.org";
    const url = host + '/user/list/' + this.props.id;
    const token = cookie.load("Access-Token");

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {"Access-Token":token},
    });

    http.get('/user/list/' + this.props.id)
      .then(
        (respond) => {callback(respond.data)}
      )
      .catch(
        (err) => {
          console.log(err);
          if (err.status===401){
            console.log("invalid token");
          } else {
            console.log("invalid request of lists info00000000000000000000");
          }
      })


  }

  archiveList(){
    //Todo remove hardcode
     this.props.group==='true' ? this.path = '/group/list/'+this.props.id+'/archive': this.path = '/user/list/'+this.props.id+'/archive';
     this.props.group==='true' ? this.body = {id:this.props.id, group_id:this.props.groupId} : this.body = {id:this.props.id};
     const token = cookie.load("Access-Token");

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {"Access-Token":token}
    });

    console.log(this.body);
    http.delete(this.path,this.body)
      .then((respond)=>{if(respond.status === 200){this.props.reloadCallback();}})
      .catch((err)=>{
        console.log(err);
        if (err.status===401){
          console.log("invalid token");
        } else {
          console.log("invalid request of lists info00000000000000000000");
        }
      })
  }

  Menu = (props) =>
    <IconMenu {...props}
      iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Archive" onTouchTap={this.archiveList}/>
    </IconMenu> ;

  // CreateArticle = () =>
  //   this.props.group==='true' ? <CreateArticle listId={this.props.id} callback={this.componentWillMount} group="true" groupId={this.props.groupId}/> : <CreateArticle listId={this.props.id} callback={this.componentWillMount}/>
  render() {
    console.log("djkdkjdkjk");
    const liItems = this.state.articles.map((article) =>
      <ArticleCard key={article['id']} id={article['id']} title={article['title']} group={this.props.group} />
    );
    //todo:archive
    return(
      <li style={this.styles.list}>
        <Card>
          {console.log(this.props.name)}
          <CardMedia>
            <AppBar title={this.props.name} titleStyle={{fontSize:'1.3em'}} iconElementLeft={<div/>} iconElementRight={this.Menu()}/>
            <ul style={this.styles.articleList}>
              {liItems}
              <CreateArticle listId={this.props.id} callback={this.componentWillMount}/>
            </ul>
          </CardMedia>
        </Card>
      </li>
    );
  }
}
