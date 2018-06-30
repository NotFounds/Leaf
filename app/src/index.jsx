import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import App from './App';
import reducer from './reducer'

const theme = createMuiTheme({
  palette: {
      primary: blue,
    },
});

const store = createStore(
  reducer, applyMiddleware(thunkMiddleware)
);

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
);

module.hot.accept();
