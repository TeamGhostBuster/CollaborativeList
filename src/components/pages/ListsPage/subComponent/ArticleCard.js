import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
//import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
//import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Up from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Chip from 'material-ui/Chip';

export default class ArticleCard extends React.Component {

  render() {
    return(
      <li style={{listStyle:'none', padding:'2%'}}>
        <Card>
          <CardHeader title={this.props.title}/>
          <CardActions style={{displa:'flex',wrap:"nowrap"}}>
              <IconButton style={{padding:'0'}}>
                <Up/>
              </IconButton>
              <Chip>0</Chip>

              <IconButton style={{padding:'0'}}>
                <Down/>
              </IconButton>
          </CardActions>
        </Card>
      </li>
    );
  }
}
