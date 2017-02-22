import React from 'react'
import {browserHistory} from 'react-router'
import List from './List'
import List from './ArticleCard'

export default class Library extends React.Component {

  render() {
    return(
      <div>
        {console.log(this.props.location.pathname === '/personal')}
      </div>
    );
  }
}
