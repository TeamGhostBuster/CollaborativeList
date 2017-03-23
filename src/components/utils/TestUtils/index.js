import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, render, shallow } from 'enzyme';

// Source: http://stackoverflow.com/a/38295396
// Author: Nícolas Iensen
// Work around to unit test the material-ui
const muiTheme = getMuiTheme();

const TestUtils = {
  mountWithContext(node) {
    return mount(node, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object }
    });
  },
  renderWithContext(node) {
    return render(node, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object }
    });
  },
  shallowWithContext(node) {
    return shallow(node, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object }
    });
  }
};

export default TestUtils;
