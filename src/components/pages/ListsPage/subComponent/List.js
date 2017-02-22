
import React from 'react'
import {brwoserHistory} from 'react-router'
import cookie from 'react-cookie'
import ArticleCard from './ArticleCard'
import Axios from 'axios'

export default class List extends React.Component {
  constructor(){
    super();
    this.getArticles = this.getArticles.bind(this);
    this.state = {articles:[]}
  }

  componentDidMount(){
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
    const liItems = this.state.articles.map((article) =>
      <ArticleCard key={article['id']} id={article['id']} title={article['title']} />
    );

    return(
      <li style={{border:'solid read 2px'}}>
        {console.log(this.props.name)}
        {this.props.name}
        <ul>
          {liItems}
        </ul>
      </li>
    );
  }
}
