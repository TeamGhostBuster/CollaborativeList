import React from 'react';
import { MenuItem } from 'material-ui';
import AddArticleToListRequest from '../../Requests/AddArticleToListRequest';

class SearchDialogListMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.pageType === "group" ?
      AddArticleToListRequest.group_add(this.props.list_id, this.props.article_id, this.props.group_id, ()=>{this.props.refreshPage(true);this.props.close();})
      :
      AddArticleToListRequest.personal_add(this.props.list_id, this.props.article_id, ()=>{this.props.refreshPage(true);this.props.close();})
  }

  render(){
    return(
      <MenuItem onTouchTap={this.handleClick}>{this.props.listName}</MenuItem>
    );
  }
}

SearchDialogListMenuItem.propTypes = {
  listName: React.PropTypes.string.isRequired,
  pageType: React.PropTypes.string.isRequired,
  article_id: React.PropTypes.string.isRequired,
  list_id: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  refreshPage: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
};
export default SearchDialogListMenuItem;
