
import React from 'react'
import ArticlePopUp from './ArticlePopUp'

export default class CreateList extends React.Component {

  // porps: {listId, callback:mount list, group, groupId}
  render() {
    return (
      <li style={{listStyle:'none'}}>
        <ArticlePopUp listId={this.props.listId} callback={this.props.callback}  group={this.props.group} groupId={this.props.groupId}/>
      </li>
    );
  }
}
