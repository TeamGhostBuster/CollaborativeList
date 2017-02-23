
import React from 'react'
import ArticlePopUp from './ArticlePopUp'

export default class CreateList extends React.Component {

  render() {
    return (
      <li style={{listStyle:'none'}}>
        <ArticlePopUp listId={this.props.listId} callback={this.props.callback}/>
      </li>
    );
  }
}
