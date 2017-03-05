import React from 'react';
//import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
//import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Up from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import IconButton from 'material-ui/IconButton'

export default class VoteButton extends React.Component{
  constructor(props){
    // props: { action: "up" or "down", id: article id}
    super(props);

    this.icon = this.props.action === "up" ? <Up/> : <Down/>;

    this.styles={
      smallIcon: {
        padding:'0', width:'20px',height:'20px'
      }
    };
  }


  render(){
    return (
      <IconButton iconStyle={this.styles.smallIcon}>
        {this.icon}
      </IconButton>
    );
  }
}

