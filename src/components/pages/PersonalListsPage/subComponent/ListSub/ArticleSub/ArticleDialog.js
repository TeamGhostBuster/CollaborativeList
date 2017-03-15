import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Axios from 'axios'
import cookie from 'react-cookie'
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Comment from './ArticleDetailSub/Comment'
import AddComment from './ArticleDetailSub/AddComment'
import ArchiveArticleRequest from '../../../../../Requests/ArchiveArticleRequest'
import GetArticleDetailRequest from '../../../../../Requests/GetArticleDetailRequest'

export default class ArticleDialog extends React.Component{
  constructor(props){
    //props: {isOpen :bool, close: function, id: string, list_id: string}
    super(props);
    this.state = {title:"", description:"", url:undefined, tags:undefined, comments:undefined};

    this.getArticleInfo = this.getArticleInfo.bind(this);
    this.remove = this.remove.bind(this);
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

  componentWillMount(){
    this.getArticleInfo();
  }


  getArticleInfo(){
    const cb = (response)=>{
      this.setState({title:response["title"],description:response["description"]});
      if (response["url"]){
        // create url section
        const urlElem = <p style={{color:'grey'}}><br/>
                          URL:<br/>
                          <a href={response["url"]}>{response["url"]}</a>
                        </p>;
        this.setState({url:urlElem})
      }
      if (response["tags"]){
        // create tag section, the divWraper is to make the tags displayed as wrapped elements
        const divWraper = (child) => <div style={this.styles.wrapper}>{child}</div>;
        const tagChips = response["tags"].map( (tag)=> <Chip key={tag} style={this.styles.chip}>{tag}</Chip> );
        this.setState({tags:divWraper(tagChips)})
      }
      if (response['comments']){
        // create comment section
        const comments = response['comments'].map(
          (comment)=> [<Divider/>,<Comment key={comment['id']} author={comment["author"]} time={comment["created_at"]} content={comment["content"]}/>]
        );
        this.setState({comments:comments})
      }
    };

    // send out the get request
    GetArticleDetailRequest.get(this.props.id, cb);

  }

  remove(){
    // send the delete request
    ArchiveArticleRequest.delete(
      this.props.list_id,
      this.props.id,
      this.props.close
    );

  }

  render (){

    const actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.props.close} />,
    ];
    return (
      <Dialog open={this.props.isOpen} actions={actions} autoScrollBodyContent={true} >
        <Paper>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={this.state.title} style={{color:'black',textOverflow:'clip ellipsis', width:'500px'}} />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton name="EditButton" tooltip="Edit"><Edit/></IconButton>
              <IconButton name="RemoveButton" tooltip="Remove" onTouchTap={this.remove}><Delete/></IconButton>
            </ToolbarGroup>
          </Toolbar>
          <CardHeader subtitle={this.state.tags}/>
          <CardText>
            <p style={{color:'grey'}}>Description:</p>
            {this.state.description}
            {this.state.url}
          </CardText>
          {this.state.comments}
          <Divider/>

            <AddComment id={this.props.id} refresh={this.componentWillMount}/>

        </Paper>
      </Dialog>
    );
  }
}
