import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  root: {
  }
}));

export default function Checkboxes() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    EU: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
          <FormControlLabel control={<Checkbox name="All" checked={state.All} onChange={handleChange} />} label="All" />
          <FormControlLabel control={<Checkbox name="AU" checked={state.AU} onChange={handleChange} />} label="AU" />
          <FormControlLabel control={<Checkbox name="EU" checked={state.EU} onChange={handleChange} />} label="EU" />
          <FormControlLabel control={<Checkbox name="UK" checked={state.UK} onChange={handleChange} />} label="UK" />
          <FormControlLabel control={<Checkbox name="US" checked={state.US} onChange={handleChange} />} label="US" />
    </FormGroup>
  );
}