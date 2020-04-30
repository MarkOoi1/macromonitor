import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllEvents } from '../../Api/eventsApi';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Moment from 'react-moment';

/*
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
*/

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  }
}));

function createData(date, day, type, description, region) {
  return { date, day, type, description, region };
}

const rows = [
  createData('24/03 @ 01:00:00', 'Wed', 'Economic', 'test tweet', 'USA'),
  createData('25/03 @ 01:00:00', 'Thu', 'Economic', 'test tweet', 'Australia')
];

export default () => {
  // Get Application state data
  const prevState = useSelector( state => state);
  const { selectedRegions } = prevState.configs;
  const [events, setEvents] = useState([]);
  const [msg, setMsg] = useState(null);

  // Re-execute if the selected region has changed. 
  useEffect(() => {
    getAllEvents()
    .then(res => {
      setEvents(res);
    })
    .catch(err => {
      console.log("msg: ",msg);
    });
  },[selectedRegions]);

  const classes = useStyles();
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Keywords</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {events.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
              <Moment fromNow>{row.date}</Moment>
              </TableCell>
              <TableCell>{row.day}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.keywords}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};