import React, {PropTypes} from 'react';
import {injectGlobal} from 'styled-components';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

injectGlobal`
  body {
    margin: 0;
  }
`;
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

const App = ({children}) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      {children}
    </MuiThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default App;
