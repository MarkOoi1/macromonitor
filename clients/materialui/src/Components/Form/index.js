import { useField } from "formik";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const TFieldSingle = ({ label, helperText, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  console.log("meta: ", meta);
  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      helperText={helperText}
      error={!!errorText}
    />
  );
};

export const TFieldMulti = ({ label, helperText, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      label={label}
      {...field}
      helperText={helperText}
      error={!!errorText}
    />
  );
};

export const ButtonConfirm = (props) => {
  const history = useHistory();
  const location = useLocation();
  const {
    to,
    dialog: { title, msg },
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseAgree = () => {
    history.push(to, { state: location });
  };
  const handleCloseDisagree = () => {
    setOpen(false);
  };

  return (
    <>
      <Button {...props} onClick={handleClickOpen} />
      <Dialog
        open={open}
        keepMounted
        onClose={handleCloseDisagree}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree}>Oops</Button>
          <Button onClick={handleCloseAgree} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
