import React from 'react'
import {CardText} from 'material-ui/Card'

export default class Comment extends React.Component{
  // props: { author:email, content, time: }
  render (){
    return (
      <CardText>
        {this.props.content}
        <p style={{color:'gray'}}> - by
          <span style={{color:'blue'}}> {this.props.author}</span>
          <span > at {this.props.time}</span>
        </p>
      </CardText>
    );
  }
}
