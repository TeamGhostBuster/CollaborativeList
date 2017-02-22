
import React from 'react'
import {brwoserHistory} from 'react-router'
import cookie from 'react-cookie'
import ArticleCard from './ArticleCard'


export default class List extends React.Component {
  constructor(){
    super();
    this.getArticles = this.Articles.bind(this);
    this.articles=[];
  }

  getArticles(callback){
    var xhr = new XMLHttpRequest();
    //const host = "http://"+window.location.host;
    const host = "https://api.vfree.org";
    xhr.open('GET', host+'/user/list/'+this.props.id)

    xhr.setRequestHeader("Access-Token",cookie.load("Access-Token"));
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          console.alert(xhr.response);
          const response = JSON.parse(xhr.response);
          callback(response);
        } else {
          console.log("bad request for getting lists");
          //browserHistory.push('/login');
        }
      }
    };
    xhr.send(null);
  }

  render() {
    const cb = (response) => {
      this.articles = response['articles'];
    };

    this.getLists(cb);

    const liItems = this.articles.map((article) =>
      <ArticleCard id={article['id']} title={article['title']} />
    );

    return(
      <li stype={{border:'solid read 2px'}}>
        {this.props.name}
        <ul>
          {liItems}
        </ul>
        {console.log(this.props.location.pathname === '/personal')}
      </li>
    );
  }
}
