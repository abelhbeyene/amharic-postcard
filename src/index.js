import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = getMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
  });

const WrappedApp = () => (
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
)

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
registerServiceWorker();
