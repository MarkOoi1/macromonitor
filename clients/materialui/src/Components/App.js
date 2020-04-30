import React, { useEffect } from 'react';
import { Header, Dashboard, Footer } from './Layout';
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
          <Dashboard />
          <Footer />
        </ThemeProvider>
      </Provider>
    );
}
