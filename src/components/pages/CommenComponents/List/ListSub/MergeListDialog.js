import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ListOfPersonalLists from './MergeListSub/ListOfPersonalLists'
import PutMergeListRequest from '../../../../Requests/PutMergeListRequest'
export default class MergeListDialog extends React.Component {
  constructor(open, close, list_id) {
    // props: {open: bool: list of ids, close: callback function, list_id: string}
    super(open, close, list_id);

    this.target = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.target = value;
  }

  handleClose(success) {
    this.target = false;
    this.props.close(success);
  }

  handleSubmit() {
    if (this.target){
      PutMergeListRequest.put_personal( this.target, this.props.list_id, ()=>{this.handleClose(true)});
    }
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog open={this.props.open} title="Merge Into" actions={actions} autoScrollBodyContent>
        <ListOfPersonalLists handleSelect={this.handleChange}/>
      </Dialog>
    );
  }
}

MergeListDialog.propTypes = {
  // if the dialog is open
  open: React.PropTypes.bool.isRequired,

  // callback function to close the dialog
  close: React.PropTypes.func.isRequired,

  // the id of the list to be changed
  list_id: React.PropTypes.string.isRequired
};
