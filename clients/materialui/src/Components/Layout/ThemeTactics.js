import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Button, Grid, TextField } from "@material-ui/core";

import { Header, Footer } from ".";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "block",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(10),
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
            <h3>Outline the Tactics</h3>
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
            <Button variant="contained">Back</Button>
            <Button variant="contained">Save and Exit</Button>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
