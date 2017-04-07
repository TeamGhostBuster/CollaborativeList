import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

export default class GroupInfo extends React.Component{
  constructor(props){
    super(props);

    this.closeAction = this.closeAction.bind(this);
  }

  closeAction(){
    this.props.close();
  }

  render(){
    const actions = [<FlatButton label="Close" onTouchTap={this.closeAction}/>];
    const members = this.props.info.members.map((member)=> <ListItem disabled={true} primaryText={`${member.first_name} ${member.last_name}`}/>)
    return(
      <Dialog title="Group Information" open={this.props.open} actions={actions} autoScrollBodyContent={true} onRequestClose={this.closeAction}>
        <List>
          <Subheader><h1>{this.props.info.name}</h1> {this.props.info.description} </Subheader>
          <Divider/>
          <Subheader>Moderator</Subheader>
          <ListItem disabled={true} primaryText={`${this.props.info.moderator.first_name} ${this.props.info.moderator.last_name}`}/>
          <Divider/>
          <Subheader>Members</Subheader>
          {members}
        </List>
      </Dialog>
    );
  }
};

GroupInfo.propTypes = {
  info: React.PropTypes.object.isRequired,

  open: React.PropTypes.bool.isRequired,

  close: React.PropTypes.func.isRequired,
};
