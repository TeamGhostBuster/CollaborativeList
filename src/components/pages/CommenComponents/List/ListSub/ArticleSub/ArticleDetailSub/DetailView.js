import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

export default class DetailView extends React.Component {

  render() {
    return (
      <div>
        <CardHeader subtitle={this.props.tags} />
        <CardText>
          <p style={{ color: 'grey' }}>Title:<br />
            {this.props.title}
          </p>
          <p style={{ color: 'grey' }}><br />Description:<br />
            {this.props.description}
          </p>
          {this.props.url}
        </CardText>
      </div>
    );
  }
}

DetailView.propTypes = {
  // title of the article
  title: React.PropTypes.string.isRequired,

  // description of the article
  description: React.PropTypes.string.isRequired,

  // tags of the article
  tags: React.PropTypes.element,

  // url of the article
  url: React.PropTypes.element
};
