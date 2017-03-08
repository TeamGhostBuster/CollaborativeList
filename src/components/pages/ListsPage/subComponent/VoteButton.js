import React from 'react';
//import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
//import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Up from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import IconButton from 'material-ui/IconButton'
import Axios from 'axios'
import cookie from 'react-cookie'

export default class VoteButton extends React.Component{
  constructor(action,id,refresh,groupId,listId){
    // props: { action: "up" or "down", id: article id, refresh: refresh the list, groupId, listId}
    super(action,id,refresh,groupId,listId);
    this.icon = this.props.action === "up" ? <Up/> : <Down/>;

    this.vote = this.vote.bind(this);

    this.styles={
      smallIcon: {
        padding:'0', width:'20px',height:'20px'
      }
    };
  }

  vote(){
    const host = "https://api.vfree.org";
    const path = this.props.action === "up"?
      "/group/"+this.props.groupId+"/list/"+this.props.listId+"/article/"+this.props.id+"/upvote":
      "/group/"+this.props.groupId+"/list/"+this.props.listId+"/article/"+this.props.id+"/downvote";
    const token = cookie.load("Access-Token");

    var http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token":token},
    });

    http.post(path)
      .then(
        (respond) => {this.props.refresh()}
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

  render(){
    return (
      <IconButton iconStyle={this.styles.smallIcon} onTouchTap={this.vote}>
        {this.icon}
      </IconButton>
    );
  }
}

