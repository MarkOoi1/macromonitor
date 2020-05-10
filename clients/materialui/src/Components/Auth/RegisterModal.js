import React, { useState, useCallback, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";

import { register } from "../../Actions/authActions";
import { clearErrors } from "../../Actions/errorActions";

import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  root: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    color: theme.palette.primary.light,
    margin: theme.spacing(2),
    float: "right",
    display: "inline",
  },
  field: {
    display: "block",
    marginBottom: "15px",
  },
  backDrop: {
    background: "rgba(0,0,0,0.7)",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const REGISTER_MUTATION = gql`
  mutation RegisterUser($name: String!, $email: String!, $google: String) {
    register(registerInput: { name: $name, email: $email, google: $google }) {
      token
      user {
        name
        email
        date
        welcomemsg
        complete
      }
    }
  }
`;

function RegisterModal() {
  const dispatch = useDispatch();

  // Set app state vars
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);

  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);

  const [registerUser] = useMutation(REGISTER_MUTATION, {
    update(proxy, result) {
      dispatch(register(true, result));
    },
    onError(err) {
      dispatch(register(false, err.graphQLErrors[0].extensions.errors));
      setMsg(err.graphQLErrors[0].extensions.errors);
    },
  });

  const classes = useStyles();

  const handleToggle = useCallback(() => {
    // Clear errors
    dispatch(clearErrors());
    setModal(!modal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  const responseGoogle = (response) => {
    if (response.profileObj.name) {
      registerUser({
        variables: {
          name: response.profileObj.name,
          email: response.profileObj.email,
          google: response.accessToken,
        },
      });
    }
  };

  useEffect(() => {
    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, modal, isAuthenticated, msg]);

  return (
    <Fragment>
      <Link href="#" variant="body2" onClick={handleToggle}>
        {"Don't have an account? Sign Up"}
      </Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={handleToggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <div className={classes.paper}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleToggle}
            >
              <CloseIcon />
            </IconButton>
            <h3 id="transition-modal-title">Create Account</h3>
            <p>{msg ? msg : <br />}</p>

            <GoogleLogin
              clientId="740760002749-cmc0elsac0nm02tss8tvejs0nppsb0vl.apps.googleusercontent.com"
              buttonText="Sign up using Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}

export default RegisterModal;
