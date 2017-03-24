import React from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, IconMenu } from 'material-ui';
import { ArticleDialogTopbarShareMenuItem } from 'components';
import SearchDialogListMenuItem from './SearchDialogListMenuItem';


export default class SearchDialogTopbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      listItems: this.props.lists?
        this.props.lists
          .filter((list)=>!list.archived)
          .map((list)=> <SearchDialogListMenuItem key={list.id} pageType={this.props.pageType} refreshPage={this.props.refreshPage} groupId={this.props.groupId}
                                                  close={this.props.close} article_id={this.props.article_id} list_id={list.id} listName={list.name}/>)
        :
        []
    };

  }




  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle
            text={this.props.title}
            style={{ color: 'black', textOverflow: 'clip ellipsis', width: '500px' }}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <IconMenu iconButtonElement={<IconButton name="AddButton" tooltip="Add To your List"><AddIcon /></IconButton>} >
            {this.state.listItems}
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

SearchDialogTopbar.propTypes = {
  // title of the article
  title: React.PropTypes.string.isRequired,

  lists: React.PropTypes.array.isRequired,

  // article id
  article_id: React.PropTypes.string.isRequired,

  // callback function to close the article
  close: React.PropTypes.func.isRequired,

  pageType: React.PropTypes.string.isRequired,

  groupId: React.PropTypes.string,

  refreshPage: React.PropTypes.func.isRequired
};
