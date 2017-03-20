import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { browserHistory } from 'react-router';

export default class Group extends React.Component {
  constructor() {
    super();
    this.goToLists = this.goToLists.bind(this);

    this.styles = {
      card: {
        width: '350px',
        height: '200px',
        textAlign: 'center',
        margin: '20px'
      },
      cardText: {
        height: '100%',
        fontSize: '200%'
      }
    };
  }

  goToLists() {
    // browserHistory.push('/group?id='+this.props.id+'&name='+this.props.name);
    console.log(`groupId:${this.props.id}`);
    browserHistory.push({ pathname: '/group', query: { id: this.props.id, name: this.props.name } });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Card style={this.styles.card} onExpandChange={this.goToLists}>
          <CardText style={this.styles.cardText} actAsExpander>
            {this.props.name}
          </CardText>
        </Card>
      </div>
    );
  }
}
