import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Menu
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Popover from '@material-ui/core/Popover';
import Backdrop from '@material-ui/core/Backdrop';

// Stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Progress bar
import LinearProgress from '@material-ui/core/LinearProgress';

// Common elements
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Custom components
import { Logout } from '../Auth';


const useStyles = makeStyles((theme) => ({
  root: {
    float: 'right',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  subheader: {
    margin: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    fontSize: '20px',

  },
  menucontent: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '500px'
    },
  },
  backDrop: {
    background: 'rgba(0,0,0,0.9)'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonRight: {
    float: 'right',
    margin: theme.spacing(2),
  },
  buttonLeft: {
    float: 'left',
    margin: theme.spacing(2),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Set your Strategic Themes', 'Configure the Tactics', 'Account Parameters', 'Review your Portfolio Plan', 'Execute your Plan'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Every portfolio begins with Strategic Themes. It is the bedrock of decision making for your portfolio.';
    case 1:
      return 'Balance your return between income and capital gain. Determine your risk exposure.';
    case 2:
      return 'Connect your portfolio to our API. Enable or disable automated trades. Configure notification settings for BUY / SELL signals.';
    case 3:
      return 'Review your Portfolio Plan Statement';
    case 4:
      return 'Now that you have your plan let Macro Monitor execute with unparallel discipline.';
    default:
      return 'Unknown step';
  }
}

export default function LetterAvatars() {
  const classes = useStyles();

  // Progress bar: initial state needs to come from user profile (TBA)
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(60);
  }, []);

  // For stepper
  const [activeStep, setActiveStep] = useState(completed);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDetail = () => {
    // TBA
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // For popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <Avatar className={classes.orange} onClick={handleClick}>N</Avatar>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          },
          timeout: 500,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.menucontent}>
          <Typography variant="h6" className={classes.subheader}>Account Setup: 60%</Typography>
          <LinearProgress variant="determinate" value={completed} color="secondary" />

          <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      color="secondary"
                      onClick={handleDetail}
                      className={classes.button}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
        <Divider variant="middle" />

        </div>
        <Button className={classes.buttonLeft}>Profile Settings</Button>
        <Button className={classes.buttonRight} onClick={handleClose}>Back to Dashboard</Button>
        <Logout />
      </Popover>

    </div>
  );
}