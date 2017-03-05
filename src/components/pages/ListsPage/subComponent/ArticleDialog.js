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
import Comment from './Comment'
import AddComment from './AddComment'

export default class ArticleDialog extends React.Component{
  constructor(props){
    //props: {isOpen :bool, close: function, id: string, list_id: string}
    super(props);
    this.state = {title:"", description:"", url:undefined, tags:undefined, comments:undefined};

    this.getArticalInfo = this.getArticalInfo.bind(this);
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
    this.getArticalInfo();
  }

  sendRequest(callback){
    const host = "https://api.vfree.org";
    const path = '/user/article/' + this.props.id;
    const token = cookie.load("Access-Token");

    var http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token":token},
    });

    http.get(path)
      .then(
        (respond) => {callback(respond.data)}
      )
      .catch(
        (err) => {
          console.log(err);
          if (err.status===401){
            console.log("invalid token");
          } else {
            console.log("invalid request of lists info");
          }
        })
  }

  getArticalInfo(){
    const cb = (response)=>{
      this.setState({title:response["title"],description:response["description"]});
      if (response["url"]){
        const urlElem = <p style={{color:'grey'}}>
                          <br/>
                          URL:
                          <br/>
                          <a href={response["url"]}>{response["url"]}</a>
                        </p>;
        this.setState({url:urlElem})
      }
      if (response["tags"]){
        const divWraper = (child) => <div style={this.styles.wrapper}>{child}</div>;
        const tagChips = response["tags"].map( (tag)=> <Chip key={tag} style={this.styles.chip}>{tag}</Chip> );
        this.setState({tags:divWraper(tagChips)})
      }
      if (response['comments']){
        const comments = response['comments'].map(
          (comment)=> [<Divider/>,<Comment key={comment['id']} author={comment["author"]} time={comment["created_at"]} content={comment["content"]}/>]
          // [ <Divider/> ,
          //   <CardText>
          //   {comment["content"]} -
          //   <span style={{color:'blue'}}>{comment["author"]}</span> <span style={{color:'gray'}}>{comment["created_at"]}</span>
          // </CardText>]
        );
        this.setState({comments:comments})
      }
    };

    this.sendRequest(cb);

  }

  remove(){
    const host = "https://api.vfree.org";
    const path = '/user/list/' +this.props.list_id+'/article/'+ this.props.id;
    const token = cookie.load("Access-Token");

    var http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token":token},
    });

    http.delete(path)
      .then(
        (respond)=>{
          this.props.close()
        }
      )
      .catch(
        (err) => {
          console.log(err);
          if (err.status===401){
            console.log("invalid token");
          } else {
            console.log("invalid request of lists info");
          }
        })
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
              <ToolbarTitle text={this.state.title} style={{color:'black'}}/>
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton tooltip="Edit"><Edit/></IconButton>
              <IconButton tooltip="Remove" onTouchTap={this.remove}><Delete/></IconButton>
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
