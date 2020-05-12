import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Formik, Form, Field } from "formik";
import { TFieldSingle, TFieldMulti } from "../Form";
import * as yup from "yup";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Header, Footer } from ".";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      display: "block",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.secondary.dark,
    },
    "& .MuiSelect-root": {
      textAlign: "left",
    },
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(10),
  },
}));

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name your theme")
    .max(30, "No longer than 30 chars"),
  description: yup.string().required().max(150, "No longer than 150 chars"),
  start_date: yup.date(),
  duration: yup.number().required(),
  end_date: yup
    .date("Select a duration or choose a date after your start date.")
    .when(
      "start_date",
      (start_date, schema) =>
        start_date &&
        schema.min(
          start_date,
          "The end date needs to be after your start date."
        )
    )
    .required("Select a duration or choose an end date."),
});

const calcEndDate = (startdate, duration) => {
  if (duration === 0) return null;
  console.log("startdate: ", startdate);
  let initDate = new Date(startdate);
  let durInDays = (duration / 12) * 365;
  console.log("Currdate: ", initDate, durInDays);
  let newDate = initDate.setDate(initDate.getDate() + durInDays);

  return new Date(newDate).toISOString();
};

export default function ThemeStrategy() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const classes = useStyles();

  return (
    <>
      <Header />

      <div className={classes.root}>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} className={classes.form}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <h3>The basics of your theme</h3>
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  start_date: new Date().toString(),
                  duration: 12,
                  end_date: calcEndDate(new Date().toString(), 12),
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log("submit: ", data);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <Form>
                    <Field
                      label="Name"
                      name="name"
                      type="input"
                      helperText="Keep it descriptive yet simple. It will be unique to all other themes in the library. Max 30 chars"
                      as={TFieldSingle}
                    />
                    <Field
                      label="Description"
                      name="description"
                      type="input"
                      helperText="Your tweet-sized elevator pitch for the theme. Make it sound like it's worth your money! Give us more info later on. Max 150 chars"
                      as={TFieldMulti}
                    />
                    <DatePicker
                      fullWidth
                      disablePast
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Start date"
                      name={"start_date"}
                      value={values["start_date"]}
                      onChange={(e) => {
                        if (values["duration"] !== 0) {
                          console.log(
                            "here",
                            calcEndDate(e, values["duration"])
                          );
                          setFieldValue(
                            "end_date",
                            calcEndDate(e, values["duration"])
                          );
                        }
                        setFieldValue("start_date", e);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      helperText="When would an investor activate this theme? Put today's date if it's in the past."
                      error={!!errors.start_date}
                    />
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        id="demo-simple-select-placeholder-label-label"
                      >
                        Duration
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={values["duration"]}
                        onChange={(e) => {
                          setFieldValue(
                            "end_date",
                            calcEndDate(values["start_date"], e.target.value)
                          );
                          setFieldValue("duration", e.target.value);
                        }}
                      >
                        <MenuItem value={0}>
                          <em>I want to set an end date</em>
                        </MenuItem>
                        <MenuItem value={1}>Up to 1 Month</MenuItem>
                        <MenuItem value={3}>1 to 3 Months</MenuItem>
                        <MenuItem value={6}>3 to 6 Months</MenuItem>
                        <MenuItem value={12} default>
                          6 to 12 Months
                        </MenuItem>
                        <MenuItem value={18}>Around 18 Months</MenuItem>
                        <MenuItem value={24}>No less 2 Years</MenuItem>
                        <MenuItem value={36}>3 Years</MenuItem>
                        <MenuItem value={48}>4 Years</MenuItem>
                        <MenuItem value={60}>5 Years</MenuItem>
                      </Select>
                      <FormHelperText>
                        The duration of the theme from the start date. The end
                        date will adjust automatically.
                      </FormHelperText>
                    </FormControl>
                    <DatePicker
                      fullWidth
                      disablePast
                      disabled={!!values["duration"]}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="End date"
                      name={"end_date"}
                      value={values["end_date"]}
                      onChange={(e) => setFieldValue("end_date", e)}
                      helperText={errors.end_date}
                      error={!!errors.end_date}
                    />

                    <Button variant="contained">Cancel</Button>
                    <Button variant="contained">Save and exit</Button>
                    <Button variant="contained" color="primary">
                      Next
                    </Button>
                  </Form>
                )}
              </Formik>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
