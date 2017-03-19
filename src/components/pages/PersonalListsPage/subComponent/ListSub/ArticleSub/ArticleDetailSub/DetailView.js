import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

export default class DetailView extends React.Component{
  constructor(title,description,tags,url){
    super(title, description,tags, url);

  }



  render(){
    return(
      <div>
        <CardHeader subtitle={this.props.tags}/>
        <CardText>
          <p style={{color:'grey'}}>Title:<br/>
            {this.props.title}
          </p>
          <p style={{color:'grey'}}><br/>Description:<br/>
            {this.props.description}
          </p>
          {this.props.url}
        </CardText>
      </div>
    );
  }
}
