import React from 'react';
import ArticlePopUp from './ArticlePopUp';

export default class CreateArticle extends React.Component {

  // porps: {listId, callback:mount list, group, groupId}
  render() {
    return (
      <li style={{ listStyle: 'none' }}>
        <ArticlePopUp
          listId={this.props.listId} callback={this.props.callback} group={this.props.group}
          groupId={this.props.groupId}
        />
      </li>
    );
  }
}

CreateArticle.propTypes = {
  // list id
  listId: React.PropTypes.string.isRequired,

  // callback function to reload the list
  callback: React.PropTypes.func.isRequired,

  // 'true' or undefined
  group: React.PropTypes.string,

  // group id if this is a group article
  groupId: React.PropTypes.string
};
