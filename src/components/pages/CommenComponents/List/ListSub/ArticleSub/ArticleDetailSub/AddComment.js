import React from 'react';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardMedia, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import CreateCommentRequest from '../../../../../../Requests/CreateCommentRequest';

export default class AddComment extends React.Component {
  constructor(props) {
    // props { id :article id, refresh: callback to refresh }
    super(props);
    this.state = { expanded: false, public: true, content: '' };

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.submit = this.submit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClose() {
    this.setState({ expanded: false, content: '' });
  }

  onOpen() {
    this.setState({ expanded: true, content: '' });
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleCheck(event, checked) {
    this.setState({ public: checked });
  }

  submit() {
    // submit the post request
    if (this.state.content !== '') {
      const cb = () => {
        this.props.refresh();
        this.setState({ expanded: false, content: '' });
      };

      const data = {
        comment: this.state.content,
        public: this.state.public
      };

      CreateCommentRequest.post(
        this.props.id, data, cb
      );
    }
  }


  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardMedia expandable>
          <TextField
            hintText="Enter Comment Here" onChange={this.handleChange}
            fullWidth multiLine underlineShow
            hintStyle={{ paddingLeft: '20px' }} textareaStyle={{ padding: '0px 20px 0px 20px' }}
          />
          <Toolbar style={{ backgroundColor: 'white' }}>
            <ToolbarGroup />
            <ToolbarGroup >
              <Checkbox
                style={{ margin: '20px', width: 'auto' }} checked={this.state.public} label="public"
                onCheck={this.handleCheck}
              />
              <FlatButton style={{ margin: '0' }} label="Cancel" labelStyle={{ color: 'grey' }} onTouchTap={this.onClose} />
              <FlatButton style={{ margin: '0' }} label="Submit" labelStyle={{ color: 'grey' }} onTouchTap={this.submit} />
            </ToolbarGroup>
          </Toolbar>
        </CardMedia>
        <CardActions>
          <FlatButton
            label="Add Comment" labelStyle={{ color: 'grey' }} icon={<CommentIcon color={'grey'} />}
            style={{ width: '100%', textAlign: 'center' }} onTouchTap={this.onOpen}
          />
        </CardActions>
      </Card>
    );
  }
}

AddComment.propTypes = {
  // id :article id,
  id: React.PropTypes.string.isRequired,

  // refresh: callback to refresh
  refresh: React.PropTypes.func.isRequired
};
