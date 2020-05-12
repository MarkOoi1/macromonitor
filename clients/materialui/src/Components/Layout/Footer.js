import React from "react";
import Idea from "./Idea";

import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {},
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Macro Monitor
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Idea />
    </div>
  );
}
