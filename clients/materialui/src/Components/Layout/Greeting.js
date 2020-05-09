import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  show: {
    position: "fixed",
    top: "30%",
    left: "50%",
    zIndex: 2000,
  },
  hide: {
    display: "none",
  },
}));

const Greeting = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSkipClose = () => {
    setOpen(false);
    //dispatch(disableWelcome());
  };

  return (
    <div className={open ? classes.show : classes.hide}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Complete your profile. Create your plan.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a Theme from the library or create a Theme.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipClose} color="primary">
            I'll do this later
          </Button>
          <Button onClick={handleClose} color="secondary">
            Let's do this
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Greeting;
