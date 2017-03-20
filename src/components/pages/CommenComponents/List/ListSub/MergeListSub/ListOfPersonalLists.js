import React from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List'
import GetUserListsRequest from '../../../../../Requests/GetUserListsRequest'

let SelectableList = makeSelectable(List);

export default class ListOfPersonalLists extends React.Component{
  constructor(props){
    super(props);

    this.state = {targetId: false, lists: false};

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount(){
    GetUserListsRequest.get((response) => {
      this.lists = response.lists;
      this.setState( {lists: response.lists
        .filter((object)=>!object.archived)
        .map(
          (list)=> <ListItem key={list.id} primaryText={list.name} value={list.id} />
        )}
      )
    })
  }

  handleSelect(event,value){
    this.setState({targetId: value});
    this.props.handleSelect(value);
  }

  render(){
    return(
      <SelectableList value={this.state.targetId} onChange={this.handleSelect}>
        {this.state.lists}
      </SelectableList>
    );
  }
}

ListOfPersonalLists.propTypes = {
  // callback function to handle the selection, parameter: value
  handleSelect: React.PropTypes.func.isRequired
}
