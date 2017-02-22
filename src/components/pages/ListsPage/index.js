import React from 'react'
import {browserHistory} from 'react-router'
import List from './subComponent/List'
import cookie from 'react-cookie'


export default class ListsPage extends React.Component {
  constructor(){
    super();
    this.getLists = this.getLists.bind(this);
    this.lists=[];
  }

  getLists(callback){
    var xhr = new XMLHttpRequest();
    //todo: change it later
    const host = "http://"+window.location.host;
    //const host = "https://api.vfree.org";
    xhr.open('GET', host+'/user/lists');
    //todo: change it back to not hard-coded
    xhr.setRequestHeader("Access-Token","ya29.Glz5AzA3XFq6DSUDSeeIYIIxIXSPe5rdwIqvRe-tSqUrKW5tyW25ql5S9zs8eRdknLyzK4cGgoAdOVyRWKurMAjTwN7wGNva2WuByptXut8Crljlvgq72IKHjLz4ow");
    //xhr.setRequestHeader("Access-Token",cookie.load("Access-Token"));
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          console.log(xhr.response);
          const response = JSON.parse(xhr.response);
          callback(response);
        } else {
          console.log(xhr.status);
          console.log("bad request for getting lists");
          //browserHistory.push('/login');
        }
      }
    };
    xhr.send(null);
  }

  render() {
    const cb = (response) => {
      this.lists = response['lists'];
    };

    this.getLists(cb);

    const liItems = this.lists.map((listObject) =>
      <List id={listObject['id']} name={listObject['name']} />
    );

    return(
      <div>
        <ul>
          {liItems}
        </ul>
        {console.log(this.props.location.pathname === '/personal')}
      </div>
    );
  }
}
