import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { logout } from "../../Actions/authActions";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
    margin: theme.spacing(2),
    float: "right",
    display: "inline",
  },
}));

export default function Logout() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  );
}
