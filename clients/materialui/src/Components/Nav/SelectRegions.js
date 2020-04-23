import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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


export default function SelectRegion(options) {
  let regions = [];
  const [state, setState] = React.useState(
    regions
  );

  const [open, setOpen] = React.useState(false);

  let regionList = options.regions.regions;

  const classes = useStyles();

  const handleChange = (event) => {
    setState(event.target.value);

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.headerElements}>
        <typography>{(state != '') ? state : "Worldwide"}</typography>
        <Button className={classes.button} onClick={handleClickOpen}>Change</Button>
      </div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Region:</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={(state != '') ? state : "Worldwide"}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="Worldwide">
                  <em>Worldwide</em>
                </MenuItem>
                {regionList.map((region, index, arr) => 
                <MenuItem value={arr[index]}>{arr[index]}</MenuItem>
                )}
              </Select>
            </FormControl>
          </form>
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