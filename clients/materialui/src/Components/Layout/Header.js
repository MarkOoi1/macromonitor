import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SelectRegion from '../Nav/SelectRegions';

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

  const classes = useStyles();

  return (
    <div className={classes.header}>
          <img src="/images/Logo.png" className={classes.logo} alt="" /> 
          <SelectRegion regions={regions} />
    </div>
  );
}