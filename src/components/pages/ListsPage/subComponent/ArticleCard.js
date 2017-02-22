import React from 'react'
import {browserHistory} from 'react-router'


export default class ArticleCard extends React.Component {

  render() {
    return(
      <li style={{border: 'solid 1px black', backgroundColor:'red'}}>
        title: {this.props.title}<br/>
      </li>
    );
  }
}
