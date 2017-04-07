import React from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, IconMenu, MenuItem } from 'material-ui';
import ArchiveArticleRequest from '../../../../../../Requests/ArchiveArticleRequest';
import { ArticleDialogTopbarShareMenuItem } from 'components';
import GetUserListsRequest from '../../../../../../Requests/GetUserListsRequest';
import GetGroupListsRequest from '../../../../../../Requests/GetGroupListsRequest';
import GetUserGroupsRequest from '../../../../../../Requests/GetUserGroupsRequest';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export default class TopBarGroupsMenu extends React.Component{
  constructor(props){
    super(props);

    this.state = {groupLists:[]};
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    const formGroupLists = (response)=> {
      this.setState({
        groupLists: response.lists
          .filter((obj) => !obj.archived)
          .map((listObject) =>
            <ArticleDialogTopbarShareMenuItem
              key={listObject.id}
              name={listObject.name}
              articleId={this.props.articleId}
              baseListId={this.props.baseListId}
              targetListId={listObject.id}
              group="true"
              groupId={this.props.groupObject.id}
              close={this.props.close}
              refreshPage={this.props.refreshPage}
            />
          )
      })

    };
    GetGroupListsRequest.get(this.props.groupObject.id, formGroupLists );
  }

  render(){
    return(
        <MenuItem rightIcon={<ArrowDropRight />} primaryText={this.props.groupObject.name} menuItems={this.state.groupLists}/>
    );
  }
}

TopBarGroupsMenu.propTypes = {
  articleId: React.PropTypes.string.isRequired,

  baseListId: React.PropTypes.string.isRequired,

  groupObject: React.PropTypes.object.isRequired,

  close: React.PropTypes.func.isRequired,

  refreshPage: React.PropTypes.func.isRequired,
};
