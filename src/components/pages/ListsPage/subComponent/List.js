
import React from 'react'
import {browserHistory} from 'react-router'
import cookie from 'react-cookie'
import ArticleCard from './ArticleCard'
import Axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import CreateArticle from './CreateArticle'


export default class List extends React.Component {
  constructor(){
    super();
    this.getArticles = this.getArticles.bind(this);
    this.state = {articles:[]};
    this.componentWillMount = this.componentWillMount.bind(this);
    this.styles = {
      list: {
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
      headers: {"Access-Token":"michaellam.lzc"},
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



  render() {
    console.log("djkdkjdkjk");
    const liItems = this.state.articles.map((article) =>
      <ArticleCard key={article['id']} id={article['id']} title={article['title']} />
    );
    //todo:archive
    return(
      <li style={this.styles.list}>
        <Card>
          {console.log(this.props.name)}
          <CardMedia>
            <AppBar title={this.props.name} iconElementLeft={<div/>} iconElementRight={<div/>}/>
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
