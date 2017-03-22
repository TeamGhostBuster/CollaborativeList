import React from 'react';
import { Dialog, FlatButton, List } from 'material-ui';
import ArchivedListItem from '../../../common/ArchivedListItem';
import GetUserListsRequest from '../../../Requests/GetUserListsRequest';
import GetGroupListsRequest from '../../../Requests/GetGroupListsRequest';
import RetrieveListRequest from '../../../Requests/RetrieveListRequest';

class RetrieveArchivedListDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: [],
    };

    // Selected list item
    this.seletedList = [];

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);

    // Dialog buttoms actions
    this.actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Retrieve"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];
  }

  componentWillMount() {
    const getArchivedListCallback = (response) => {
      const listObjs = response.lists;
      this.setState({
        listItems: listObjs
          .filter((obj) => obj.archived)
          .map((listObject) => <ArchivedListItem
            name={listObject.name}
            list_id={listObject.id}
            selectedAction={this.handleSelect}
          />)
      });
    };

    if (this.props.pageType === 'personal') {
      GetUserListsRequest.get(getArchivedListCallback);
    } else {
      GetGroupListsRequest.get(this.props.groupId, getArchivedListCallback);
    }
  }

  // Handle selectoin event
  handleSelect(selected, id) {
    if (selected) {
      this.seletedList.push(id);
    } else {
      const index = this.seletedList.indexOf(id);
      this.seletedList.splice(index, 1);
    }
  }

  // Close dialog event
  handleClose(success) {
    this.props.close();
    if (success) {
      this.props.reloadCallback();
    }
  }

  // Send our retrieve method
  handleSubmit() {
    if (this.props.pageType === 'group') {
      RetrieveListRequest.put(this.seletedList, true, this.props.groupId, this.handleClose);
    } else {
      RetrieveListRequest.put(this.seletedList, false, null, this.handleClose);
    }
  }

  render() {
    return (
      <Dialog
        title="Retrieve Archived List"
        open={this.props.open}
        actions={this.actions}
        onRequestClose={this.props.close}
        autoScrollBodyContent
      >
        <List>
          {this.state.listItems}
        </List>
      </Dialog>
    );
  }
}

RetrieveArchivedListDialog.propTypes = {
  // The callback method from the parent component
  close: React.PropTypes.func.isRequired,
  open: React.PropTypes.func.isRequired,
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired
};

export default RetrieveArchivedListDialog;
