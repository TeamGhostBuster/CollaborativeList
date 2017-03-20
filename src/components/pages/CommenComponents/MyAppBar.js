import React from 'react';
import { AppBar, IconButton } from 'material-ui';
import { browserHistory } from 'react-router';
import Back from 'material-ui/svg-icons/hardware/keyboard-backspace';

export default class MyAppBar extends React.Component {

  // props : title(required)
  render() {
    this.styles = {
      bar: {
        width: '100%'
      }
    };
    return (
      <AppBar
        style={this.styles.bar} title={this.props.title}
        iconElementLeft={
          <IconButton name="backButton" onTouchTap={browserHistory.goBack}>
            <Back color={'#ffffff'} />
          </IconButton>
              }
      />
    );
  }
}
