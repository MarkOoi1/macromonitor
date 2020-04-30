import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { login } from '../../Actions/authActions';
import { clearErrors } from '../../Actions/errorActions';
import { RegisterModal } from './';

import { GoogleLogin } from 'react-google-login';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Macro Monitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  modal: {
    outline: 'none'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backDrop: {
    background: 'rgba(0,0,0,0.9)'
  },
  social: {
    borderTop: '1px solid #666',
    paddingTop: '20px',
    marginTop: '20px',
    flexGrow: 1,
    textAlign: "center"
  },
  error: {
    color: theme.palette.secondary.main
  }
}));

function LoginModal() {
  const dispatch = useDispatch();
  
  // Set app state vars
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  

  const [modal, setModal] = useState(!isAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const classes = useStyles();

  const handleToggle = useCallback(() => {
    // Clear errors
    dispatch(clearErrors());
    setModal(!modal);
  }, [modal]);

  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    dispatch(login(user));
  };

  useEffect(() => {
    // Check for login error
    
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error,modal,isAuthenticated]);

  const responseGoogle = (response) => {
    const userGoogle = {
      email: response.profileObj.email,
      google: response.accessToken
    };

    dispatch(login(userGoogle));
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          },
          timeout: 500,
        }}
      >
        <Fade in={modal}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChangeEmail}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChangePassword}
                  disableAutoFocus={true}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    
                      {msg ? <Typography className={classes.error}>{msg}</Typography> : ''}
                      
                  </Grid>
                  <Grid item>
                  <RegisterModal />
                  </Grid>
                </Grid>
                <Grid container>

                    <div className={classes.social}>
                    <GoogleLogin
                      clientId="740760002749-cmc0elsac0nm02tss8tvejs0nppsb0vl.apps.googleusercontent.com"
                      buttonText="Sign in with Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                    />
                    </div>

                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
        </Fade>
      </Modal>
 
    </div>
  );
}


export default LoginModal;