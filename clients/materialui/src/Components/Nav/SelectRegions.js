import React, { useState } from 'react';
import { 
  makeStyles, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'; 
import { useSelector, useDispatch } from 'react-redux';
import { setConfig } from '../../Actions/configActions';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  headerElements: {
    color: theme.palette.primary.light,
    margin: theme.spacing(2),
    float: "right",
    display: "inline",
  },
  button: {
    color: theme.palette.primary.light,
    border: "1px solid #333",
    marginLeft: "10px"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const getRegionsByName = (regions) => regions.map(({name},index,res) => res[index]=name);


export default function SelectRegion() {
  const prevState = useSelector( state => state);

  const regions = [
    ...prevState.regions
  ];
  
  const { selectedRegions } = prevState.configs;
  
  const dispatch = useDispatch();

  const [state, setState] = useState({
    "open": false
  });

  const regionList = getRegionsByName(regions);
  const classes = useStyles();

  const handleChange = (event) => {
    dispatch(setConfig({selectedRegions: event.target.value}));
  };

  const handleClickOpen = () => {
    setState({
      "open": true});
  };

  const handleClose = () => {
    setState({
      "open": false});
  };

  return (
    <div>
      <div className={classes.headerElements}>
        {(selectedRegions !== '' || selectedRegions !== undefined) ? selectedRegions : "Worldwide"}
        <Button className={classes.button} onClick={handleClickOpen}>Change</Button>
      </div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={state.open} onClose={handleClose}>
        <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Region:</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={(selectedRegions !== '' || selectedRegions !== undefined) ? selectedRegions : "Worldwide"}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="Worldwide">
                  <em>Worldwide</em>
                </MenuItem>
                {regionList.map((region, index, arr) => 
                <MenuItem key={index} value={arr[index]}>{arr[index]}</MenuItem>
                )}
              </Select>
            </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}