
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
        listStyle:'none',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        padding: '0'
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
        <Card onClick={this.goToLists}>
          <CardText>
            Personal Lists <br/><br/><br/>
          </CardText>
        </Card>
        </ul>

      </div>
    );
  }
}
