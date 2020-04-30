import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import SelectRegion from '../Nav/SelectRegions';
import { LoginModal, Logout } from '../Auth';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: "60px",
    borderBottom: "1px solid #333"
  },
  logo: {
    paddingTop: "18px",
    paddingLeft: "20px",
    float: "left"
  }
}));

export default function Header(regions) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const classes = useStyles();

  return (
    <div className={classes.header}>
          <img src="/images/Logo.png" className={classes.logo} alt="" /> 
          {isAuthenticated ? <Logout />:<LoginModal />}
          <SelectRegion regions={regions} />
    </div>
  );
}