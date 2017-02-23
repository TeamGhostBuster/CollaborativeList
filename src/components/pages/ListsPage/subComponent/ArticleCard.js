import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default class ArticleCard extends React.Component {

  render() {
    return(
      <li style={{listStyle:'none', padding:'2%'}}>
        <Card>
          <CardHeader title={this.props.title}/>
          <CardActions>
            <FlatButton label="click me?" backgroundColor={'#E0E0E0'}/>
          </CardActions>
        </Card>
      </li>
    );
  }
}
