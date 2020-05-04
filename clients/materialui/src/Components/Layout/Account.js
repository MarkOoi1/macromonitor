import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Header, Footer } from "./";

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: "60px",
    borderBottom: "1px solid #333",
  },
  logo: {
    paddingTop: "18px",
    paddingLeft: "20px",
    float: "left",
  },
}));

export default function Account() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const classes = useStyles();

  return (
    <>
      <Header />
      <h2>Account</h2>
      <Footer />
    </>
  );
}
