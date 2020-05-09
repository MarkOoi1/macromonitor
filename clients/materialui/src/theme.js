import {
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import { grey, amber } from "@material-ui/core/colors";

// Using unstable_createMuiStrictModeTheme while Material UI bug fixes are pushed out. https://github.com/mui-org/material-ui/issues/13394

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey["900"],
      light: grey["700"],
    },
    secondary: amber,
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontSize: 12,
    h2: {
      color: grey["500"],
    },
    h5: {
      color: grey.A700,
    },
    subtitle1: {
      color: grey.A200,
    },
    body1: {
      fontSize: 12,
    },
  },
  overrides: {
    props: {
      MuiFormControlLabel: {
        root: {
          color: "#FF0000",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
