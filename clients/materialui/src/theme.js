import {
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import { grey, amber } from "@material-ui/core/colors";

// Using unstable_createMuiStrictModeTheme while Material UI bug fixes are pushed out. https://github.com/mui-org/material-ui/issues/13394

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
    background: {
      default: "#ebebeb",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

let theme1 = createMuiTheme({
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
