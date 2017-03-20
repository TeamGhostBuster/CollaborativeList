import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Comment from './ArticleDetailSub/Comment';
import AddComment from './ArticleDetailSub/AddComment';
import GetArticleDetailRequest from '../../../../../Requests/GetArticleDetailRequest';
import TopBar from './ArticleDetailSub/TopBar';
import DetailView from './ArticleDetailSub/DetailView';

export default class ArticleDialog extends React.Component {
  constructor(isOpen, close, id, list_id) {
    // props: {isOpen :bool, close: function, id: string, list_id: string}
    super(isOpen, close, id, list_id);
    this.state = { title: '', description: '', url: undefined, tags: undefined, comments: undefined, detail: undefined };

    this.getArticleInfo = this.getArticleInfo.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  componentWillMount() {
    this.getArticleInfo();
  }


  getArticleInfo() {
    const cb = (response) => {
      this.setState({ title: response.title, description: response.description });
      if (response.url) {
        // create url section
        const urlElem = (<p style={{ color: 'grey' }}><br />
          URL:<br />
          <a href={response.url}>{response.url}</a>
        </p>);
        this.setState({ url: urlElem });
      }
      if (response.tags) {
        // create tag section, the divWraper is to make the tags displayed as wrapped elements
        const divWraper = (child) => <div style={this.styles.wrapper}>{child}</div>;
        const tagChips = response.tags.map((tag) => <Chip key={tag} style={this.styles.chip}>{tag}</Chip>);
        this.setState({ tags: divWraper(tagChips) });
      }
      if (response.comments) {
        // create comment section
        const comments = response.comments.map(
          (comment) => [<Divider />,
            <Comment key={comment.id} author={comment.author} time={comment.created_at} content={comment.content} />]
        );
        this.setState({ comments });
      }
      this.setState({
        detail: <DetailView
          title={this.state.title} description={this.state.description} url={this.state.url}
          tags={this.state.tags}
        />
      });
    };

    // send out the get request
    GetArticleDetailRequest.get(this.props.id, cb);
  }


  render() {
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.props.close} />,
    ];
    return (
      <Dialog open={this.props.isOpen} actions={actions} autoScrollBodyContent onRequestClose={this.props.close}>
        <Paper>
          <TopBar
            title={this.state.title} list_id={this.props.list_id} article_id={this.props.id}
            close={this.props.close}
          />
          {this.state.detail}
          {this.state.comments}
          <Divider />
          <AddComment id={this.props.id} refresh={this.componentWillMount} />

        </Paper>
      </Dialog>
    );
  }
}

ArticleDialog.Pro = {
  // if the dialog is open
  isOpen: React.PropTypes.bool.isRequired,

  // callback function to close the dialog from parent
  close: React.PropTypes.func.isRequired,

  // article id
  id: React.PropTypes.string.isRequired,

  // list id
  list_id: React.PropTypes.string.isRequired,

};
