import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/*
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
*/

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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

  const classes = useStyles();


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Region</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.day}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};