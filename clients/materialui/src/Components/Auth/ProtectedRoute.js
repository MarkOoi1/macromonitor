import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Spinner } from "../Layout";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  let authent = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("auth here: ", authent);
  }, [authent]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authent.isAuthenticated === null && authent.token) {
          return <Spinner />;
        }

        if (authent.isAuthenticated === null && !authent.token) {
          console.log("came through here1");
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return (
            <>
              <Spinner />
              <Component {...props} />
            </>
          );
        }
      }}
    />
  );
};
