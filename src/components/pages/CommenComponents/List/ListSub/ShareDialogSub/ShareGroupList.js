import React from 'react';
import { List } from 'material-ui/List'
import GetUserGroupsRequest from '../../../../../Requests/GetUserGroupsRequest'
import ShareGroupListItem from './ShareGroupListItem'


export default class ShareGroupList extends React.Component{
  constructor(props){
    super(props);

    this.state = {groups: []};

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    GetUserGroupsRequest.get((response) => {
      this.setState( {groups: response.groups
        .map(
          (group)=> <ShareGroupListItem key={group.id} name={group.name} id={group.id} selectedAction={this.props.handleSelect}/>
        )}
      )
    })
  }

  render(){
    return(
      <List>
        {this.state.groups}
      </List>
    );
  }
}

ShareGroupList.propTypes = {
  // callback function to handle the selection, parameter: value
  handleSelect: React.PropTypes.func.isRequired
};
