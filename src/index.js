import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const theme = getMuiTheme({
    appBar: {
        color: 'black', // Switching the dark mode on is a single property value change.
    },
    "palette": {
        "primary1Color": "#d32f2f"
    }
});

const WrappedApp = () => (
    <MuiThemeProvider muiTheme={theme}>
        <App />
    </MuiThemeProvider>
)

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
registerServiceWorker();
