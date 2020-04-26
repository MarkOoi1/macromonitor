import React, { Component } from 'react';
import { Header, Dashboard, Footer } from './Layout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../theme";

export default class App extends Component {

  render() {
    
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Dashboard />
        <Footer />
      </ThemeProvider>
    );
  }
}
