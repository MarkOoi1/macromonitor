import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { logout } from '../../Actions/authActions';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
    margin: theme.spacing(2),
    float: "right",
    display: "inline",
  }
}));


export default function Logout() {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div>
      <Button className={classes.button} variant="contained" color="primary" type="button" onClick={() => dispatch(logout())}>
      Logout
      </Button>
    </div>
  )
}
