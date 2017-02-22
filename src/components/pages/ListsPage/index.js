import React from 'react'
import {browserHistory} from 'react-router'
import List from './subComponent/List'
import cookie from 'react-cookie'
import Axios from 'axios'

export default class ListsPage extends React.Component {
  constructor(){
    super();
    this.getLists = this.getLists.bind(this);
    this.state = {lists:[]};
  }

  componentDidMount(){
    var that = this;
    const cb = (response) => {
      console.log(response)
      that.setState({ lists: response['lists']});
    };
    this.getLists(cb);
  }

  getLists(callback){
    //todo: remove the hardcoded part
    const host = window.location.host;
    const token = cookie.load('Access-Token');

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {"Access-Token":"michaellam.lzc"},
    });

    http.get('/user/lists')
      .then((respond) =>{
        if (respond.status===200){

          callback(respond.data);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status===401){
          console.log("invalid token");
        } else {
          console.log("invalid request of lists info1111");
        }
      })
  }

  render() {

    const liItems = this.state.lists.map((listObject) =>
      <List key={listObject['id']} id=={listObject['id']} name={listObject['name']} />
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

