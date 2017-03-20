import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ShareGroupList from './ShareDialogSub/ShareGroupList';
import PostShareListRequest from '../../../../Requests/PostShareListRequest';

export default class ShareListDialog extends React.Component{
  constructor(props){
    super(props);

    this.groups = [];

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSelect(selected, id){
    if (selected) {
      // add the selected group to the list
      this.groups.push(id);
    } else {
      // remove the group from the list
      const index = this.groups.indexOf(id);
      this.groups.splice(index,1);
    }
    console.log("share dialog:", this.groups);
  }

  handleSubmit(){
    if (this.groups != false){
      PostShareListRequest.post(this.props.list_id, this.groups, ()=>{this.handleClose()})
    }
  }

  handleClose(){
    this.groups = [];
    this.props.close();
  }

  render(){
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit} />
    ];
    return(
      <Dialog open={this.props.open} actions={actions} autoScrollBodyContent={true}
              title="Choose The Groups To Share To">
        <ShareGroupList handleSelect={this.handleSelect}/>
      </Dialog>
    );
  }
}

ShareListDialog.propTypes = {
  // if this dialog is open
  open: React.PropTypes.bool.isRequired,

  // id of the list that is being shared
  list_id: React.PropTypes.string.isRequired,

  // callback to close the dialog
  close: React.PropTypes.func.isRequired
};
