import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Header, Dashboard, Account, Footer } from './Layout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../theme";

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../Actions/authActions';

export default function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
          <Router>
            <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/Account">
              <Account />
            </Route>
          </Switch>
          
          </Router>
          
          <Footer />
        </ThemeProvider>
      </Provider>
    );
}
