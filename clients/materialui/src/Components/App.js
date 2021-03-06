import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./Auth/ProtectedRoute";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Dashboard, Account, ThemeStrategy, ThemeTactics } from "./Layout";
import Login from "./Auth/Login";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../Actions/authActions";

export default function App() {
  const client = new ApolloClient({
    uri: "/graphql",
  });

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <ProtectedRoute path="/account" component={Account} />
              <ProtectedRoute
                path="/themes/strategy"
                component={ThemeStrategy}
              />
              <ProtectedRoute path="/themes/tactics" component={ThemeTactics} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}
