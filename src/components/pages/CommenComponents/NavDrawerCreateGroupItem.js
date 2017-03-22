import React from 'react';
import { MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import CreateGroupDialog from './NavDrawer/CreateGroupDialog'
class NavDrawerCreateGroupItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {dialog:undefined};

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog(){
    this.setState({dialog: <CreateGroupDialog open={true} reloadCallback={this.props.reloadCallback} close={this.closeDialog}/>})
  }

  closeDialog(){
    this.setState({dialog: undefined})
  }

  render() {
    return (
      <MenuItem onTouchTap={this.openDialog} innerDivStyle={{padding:'0'}}>
        <RaisedButton label="Create Group" className="createGroup" icon={<ContentAdd/>} fullWidth={true} primary={true}/>
        {this.state.dialog}
      </MenuItem>
    );
  }
}

NavDrawerCreateGroupItem.propTypes = {
  // callback function to reload the parent
  reloadCallback: React.PropTypes.func.isRequired
};

export default NavDrawerCreateGroupItem;
