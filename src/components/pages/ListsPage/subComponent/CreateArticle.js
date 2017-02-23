
import React from 'react'
import {GridTile, RaisedButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {browserHistory} from 'react-router'

export default class CreateList extends React.Component {
  constructor(props){
    super(props);
    this.addArticle = this.addArticle.bind(this);
  }

  addArticle() {
    browserHistory.push('/createArticlePage');
  }

  render() {
    return (
      <li style={{listStyle:'none'}}>
        <RaisedButton label="Add Article" fullWidth={true} primary={true} icon={<ContentAdd/>}  onClick={this.addArticle}/>
      </li>
    );
  }
}
