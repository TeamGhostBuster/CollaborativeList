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
    this.styles={
      smallIcon: {
        padding:'0', width:'20px',height:'20px'
      }
    };
    return(
      <li style={{listStyle:'none', padding:'2%'}}>
        <Card>
          <CardHeader title={this.props.title}/>
          <CardText/>
          <CardActions style={{display:'inline-flex', flexWrap:'nowrap', width:'100%'}}>
              <IconButton iconStyle={this.styles.smallIcon}>
                <Up/>
              </IconButton>
              <Chip labelStyle={{paddingTop: '6px', height:'20px'}} backgroundColor={'#ffffff'}>0</Chip>
              <IconButton iconStyle={this.styles.smallIcon}>
                <Down/>
              </IconButton>

          </CardActions>
        </Card>
      </li>
    );
  }
}
