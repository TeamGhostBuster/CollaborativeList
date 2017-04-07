import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar'
import CreateArticleRequest from '../../../../Requests/CreateArticleRequest';

export default class ArticlePopUp extends React.Component {
  constructor(props) {
    // props { lisdTd, callback, group, groupId}
    super(props);
    this.state = {
      open: false,
      addTag: false,
      title: '',
      description: '',
      url: '',
      tag: '',
      tags: [],
      tagsData: [],
      requireTitle: 'required',
      requireDescription: 'required',
      invalidURLOpen: false,
    };

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

    // binding
    this.snackbarClose = this.snackbarClose.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.tagChange = this.tagChange.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.TagOpen = this.TagOpen.bind(this);
    this.TagClose = this.TagClose.bind(this);
    this.TagFinish = this.TagFinish.bind(this);

    this.submitToServer = this.submitToServer.bind(this);
    this.tagDelete = this.tagDelete.bind(this);
    this.renderTag = this.renderTag.bind(this);
  }

  /*= ====================handling text field==================================*/
  titleChange(event) {
    this.setState({ title: event.target.value });
    if (event.target.value !== '') {
      this.setState({ requireTitle: '' });
    } else {
      this.setState({ requireTitle: 'required' });
    }
  }

  descriptionChange(event) {
    this.setState({ description: event.target.value });
    if (event.target.value !== '') {
      this.setState({ requireDescription: '' });
    } else {
      this.setState({ requireDescription: 'required' });
    }
  }

  urlChange(event) {
    this.setState({ url: event.target.value });
  }

  tagChange(event) {
    this.setState({ tag: event.target.value });
  }

  /*= ====================== handle the form ================================*/
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ title: '' });
    this.setState({ description: '' });
    this.setState({ url: '' });
    this.setState({ tags: [] });
    this.setState({ requireTitle: 'required' });
    this.setState({ requireDescription: 'required' });
    this.setState({ open: false });
  }

  submitToServer(callback, errorCallback) {
    const data = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      tags: this.state.tags,
    };

    CreateArticleRequest.post(
      this.props.listId,
      this.props.group,
      this.props.groupId,
      data, callback,errorCallback
    );
  }

  snackbarClose(){
    this.setState({invalidURLOpen:false,requireOpen:false})
  }

  handleSubmit() {
    if (this.state.title !== '' && this.state.description !== '') {
      const cb = () => {
        this.props.callback();
        this.setState({ title: '' });
        this.setState({ description: '' });
        this.setState({ url: '' });
        this.setState({ tags: [], tagsData:[] });
        this.setState({ requireTitle: 'required' });
        this.setState({ requireDescription: 'required' });
        this.setState({ open: false });
      };

      const err = ()=>{
        this.setState({invalidURLOpen:true})
      };
      this.submitToServer(cb, err);
    }
  }

  /*= ======================= handle the tags ===============================*/
  TagOpen() {
    this.setState({ addTag: true });
  }

  TagClose() {
    this.setState({ tag: '' });
    this.setState({ addTag: false });
  }

  TagFinish() {
    if (this.state.tag !== '') {
      this.newTags = this.state.tags;
      this.newTagsData = this.state.tagsData;
      this.newTags[this.state.tags.length] = this.state.tag;
      this.newTagsData[this.state.tags.length] = { key: this.state.tags.length, label: this.state.tag };
      this.setState({ tags: this.newTags });
      this.setState({ tagsData: this.newTagsData });
      this.setState({ tag: '' });
      this.setState({ addTag: false });
    }
  }

  tagDelete(key) {
    this.tagsData = this.state.tagsData;
    this.tags = this.state.tags;
    const chipToDelete = this.tagsData.map((chip) => chip.key).indexOf(key);
    this.tagsData.splice(chipToDelete, 1);
    this.tags.splice(chipToDelete, 1);
    this.setState({ tagsData: this.tagsData });
    this.setState({ tags: this.tags });
  }

  renderTag(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.tagDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  /*= ======================================================*/

  render() {
    const formActions = [
      <FlatButton label="Cancel" className="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" className="Submit" primary onTouchTap={this.handleSubmit} />
    ];

    const tagActions = [
      <FlatButton label="Cancel" className="Cancel" primary onTouchTap={this.TagClose} />,
      <FlatButton label="Finish" className="Finish" primary onTouchTap={this.TagFinish} />
    ];


    // this one is not factored out because there are too many dependencies
    const form = [
      <div key="form">
        <TextField
          fullWidth multiLine hintText="Required" hintStyle={{ color: deepOrangeA400 }} id="ArticleTitleInput"
          floatingLabelText="Title" errorText={this.state.requireTitle} onChange={this.titleChange}
        />
        <br />
        <TextField
          fullWidth multiLine hintText="Required" hintStyle={{ color: deepOrangeA400 }}
          floatingLabelText="Description" errorText={this.state.requireDescription}
          onChange={this.descriptionChange} id="ArticleDescriptionInput"
        />
        <br />
        <TextField
          fullWidth multiLine hintText="Example: http://article.com" floatingLabelText="URL"
          onChange={this.urlChange} id="ArticleURLInput"
        />
        <br /><br />

        <div style={this.styles.wrapper}>
          {this.state.tagsData.map(this.renderTag, this)}
        </div>

        <Dialog
          open={this.state.addTag} actions={tagActions} modal contentStyle={{ width: '50%' }}
          title="Add Tag"
        >
          <TextField hintText="Optional" floatingLabelText="Enter Tag Here" onChange={this.tagChange}
                     multiLine={true} id="ArticleTagInput" />
        </Dialog>

        <RaisedButton label="Add Tag" className="AddTagButton" icon={<ContentAdd />} secondary onTouchTap={this.TagOpen} />
      </div>
    ];

    /*-----------------------------------------------*/
    return (
      <div>
        <RaisedButton
          label="Add Article" className="AddArticle" fullWidth primary icon={<ContentAdd />}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          open={this.state.open} actions={formActions} modal title="Create Article"
          autoScrollBodyContent
        >
          {form}
        </Dialog>
        <Snackbar message="Invalid URL" autoHideDuration={4000} open={this.state.invalidURLOpen} onRequestClose={this.snackbarClose}/>
      </div>
    );
  }
}

ArticlePopUp.propTypes = {
  // list id
  listId: React.PropTypes.string.isRequired,

  // callback function to reload the list
  callback: React.PropTypes.func.isRequired,

  // 'true' or undefined
  group: React.PropTypes.string,

  // group id if this is a group article
  groupId: React.PropTypes.string
};
