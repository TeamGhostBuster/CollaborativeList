import React from 'react';
import Dialog from 'material-ui/Dialog';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ArticleListItem from './PartitionDialogSub/ArticleListItem';
import NewListName from './PartitionDialogSub/NewListName';

export default class PartitionDialog extends React.Component {
  constructor(open, list_id, gourp, group_id, close, articles) {
    super(open, list_id, gourp, group_id, close, articles);

    this.state = { listItems: [], NameDialog: [] };
    this.articlesSelected = [];

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.closeNameDialog = this.closeNameDialog.bind(this);

    this.dialogActions = [
      <FlatButton label="Cancel" className="Cancel" onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" className="Submit" onTouchTap={this.handleSubmit} />
    ];
  }

  componentWillMount() {
    this.setState({
      listItems: this.props.articles.map(
        (article) => <ArticleListItem
          key={article.id} title={article.title}
          article_id={article.id} selectedAction={this.handleSelect}
        />)
    });
  }

  handleSelect(selected, id) {
    if (selected) {
      // add the id of the selected article into the list
      this.articlesSelected.push(id);
    } else {
      // remove the id of the article from the list
      const index = this.articlesSelected.indexOf(id);
      this.articlesSelected.splice(index, 1);
    }
    console.log('partitionDialog:', this.articlesSelected);
  }

  handleClose(success) {
    // close the dialog
    this.articlesSelected = [];
    this.props.close(success);
  }

  handleSubmit() {
    // submit if the selected articles are not empty
    if (this.articlesSelected != false) {
      this.setState({
        NameDialog: <NewListName
          open={true} articles={this.articlesSelected} close={this.closeNameDialog}
          list_id={this.props.list_id}
        />
      });
    }
  }

  closeNameDialog(success) {
    // close the name dialog
    this.setState({ NameDialog: [] });
    if (success) {
      this.handleClose(success);
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.open} title="Choose The Articles To Be Partitioned"
        actions={this.dialogActions}
        autoScrollBodyContent={true}
      >
        <List>
          {this.state.listItems}
        </List>
        {this.state.NameDialog}
      </Dialog>
    );
  }
}

PartitionDialog.propTypes = {
  // if the dialog is open
  open: React.PropTypes.bool.isRequired,

  // list id
  list_id: React.PropTypes.string.isRequired,

  // 'true' or undefined
  gourp: React.PropTypes.string,

  // group id if this is for a group
  group_id: React.PropTypes.string,

  // callback function to close the dialog
  close: React.PropTypes.func.isRequired,

  // a list of article objects
  articles: React.PropTypes.array.isRequired
};
