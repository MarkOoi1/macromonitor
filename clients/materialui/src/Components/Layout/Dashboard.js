import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000",
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(1)
  },
  subHeader: {
  },
  appBar: {
    backgroundColor: "#111",
    width: '100%',

  },
  tab: {
    minWidth: 70,
    marginLeft: theme.spacing(2)
  }
}));

export default function SimpleTabs() {
  const prevState = useSelector( state => state);
  
  const { selectedRegions } = prevState.configs;


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
      <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="dashboard menu"
        >
          <Tab className={classes.tab} label="Overview" {...a11yProps(0)} />
          <Tab className={classes.tab} label="COVID19" {...a11yProps(1)} />
          <Tab className={classes.tab} label="Monetary Policy" {...a11yProps(2)} />
          <Tab className={classes.tab} label="Economic Data" {...a11yProps(3)} />
          <Tab className={classes.tab} label="Related Markets" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        You are now viewing data for the region {selectedRegions}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </div>
  );
}