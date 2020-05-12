import { useField } from "formik";
import React from "react";
import { TextField } from "@material-ui/core";

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
