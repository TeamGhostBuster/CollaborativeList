
import React from 'react'
import {browserHistory} from 'react-router'
import {Card, CardText} from 'material-ui/Card'

//import Button from 'react-toolbox/lib/button'

export default class UpperSection extends React.Component {
 constructor() {
    super();
    this.goToLists = this.goToLists.bind(this);
    this.styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '100%'
      },
      List: {
        width:'350px',
        height:'200px',
        textAlign:'center'
      },
      cardText:{
        height: '100%',
        fontSize: '200%'
      }
    }
  }


  goToLists(){
    browserHistory.push('/personal')
  }

  render() {

    return (
      <div style={this.styles.root}>
        <ul>
        <Card style={this.styles.List} expandable={true} onExpandChange={this.goToLists}>
          <CardText style={this.styles.cardText} actAsExpander={true}>
            Personal Lists
          </CardText>
        </Card>
        </ul>

      </div>
    );
  }
}
