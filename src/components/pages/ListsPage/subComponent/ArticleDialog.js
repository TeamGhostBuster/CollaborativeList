import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Axios from 'axios'
import cookie from 'react-cookie'

export default class ArticleDialog extends React.Component{
  constructor(props){
    //props: {isOpen :bool, close: function, id: string}
    super(props);
    this.state = {title:"", description:"", url:undefined, tags:undefined,comments:undefined};

    this.getArticalInfo = this.getArticalInfo.bind(this);

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
        this.setState({url:response["url"]})
      }
      if (response["tags"]){
        const divWraper = (child) => <div style={this.styles.wrapper}>{child}</div>;
        const tagChips = response["tags"].map( (tag)=> <Chip key={tag} style={this.styles.chip}>{tag}</Chip> );
        this.setState({tags:divWraper(tagChips)})
      }
      if (response['comments']){
        this.setState({comments:response["comments"]})
      }
    };

    this.sendRequest(cb);

  }

  render (){

    const actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.props.close} />,
    ];

    return (
      <Dialog open={this.props.isOpen} actions={actions}>
        <CardHeader title={this.state.title} subtitle={this.state.tags}/>
        <CardText>{this.state.description}</CardText>
      </Dialog>
    );
  }
}
