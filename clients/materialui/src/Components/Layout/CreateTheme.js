import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";

import { Header, Footer } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "block",
    },
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CreateTheme() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const classes = useStyles();

  return (
    <>
      <Header />

      <div className={classes.root}>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} className={classes.form}>
            <h3>The basics of your Theme</h3>
            <TextField
              id="filled-basic"
              label="Name of Theme"
              variant="filled"
              fullWidth
            />
            <TextField
              id="filled-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="filled"
              fullWidth
            />
            <TextField
              id="filled-basic"
              label="Start Date"
              variant="filled"
              fullWidth
            />
            <TextField
              id="filled-basic"
              label="End Date"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
