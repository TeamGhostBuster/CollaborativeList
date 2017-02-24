import React from 'react'
import{Card, CardText} from 'material-ui/Card'


export default class Group extends React.Component {
  constructor() {
    super();
    this.styles = {
      card:{
        width:'350px',
        height:'200px',
        textAlign:'center',
        margin:'20px'
      },
      cardText:{
        height: '100%',
        fontSize: '200%'
      }
    }
  }

  render() {
    return(
      <div style={{display:'flex'}}>
        <Card style={this.styles.card} >
          <CardText style={this.styles.cardText} actAsExpander={true} onTouchTap={this.goToLists}>
            {this.props.name}
          </CardText>
        </Card>
      </div>
    );
  }
}
