import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#333",
    zIndex: 2000,
  },
  loader: {
    left: "50%",
    top: "30%",
    position: "absolute",
    zIndex: 3000,
  },
  loaded: {
    display: "none",
  },
}));

const Spinner = () => {
  const classes = useStyles();
  let auth = useSelector((state) => state.auth);

  return (
    <div className={auth.isLoading ? classes.root : classes.loaded}>
      <div className={classes.loader}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
};

export default Spinner;
