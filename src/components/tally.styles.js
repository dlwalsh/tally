import {
  AppBar as MaterialAppBar,
  Chip as MaterialChip,
  IconButton as MaterialIconButton,
  Tabs as MaterialTabs,
  TableRow as MaterialTableRow,
  withStyles,
} from "@material-ui/core";
import { amber, blue, brown, green, grey, red } from "@material-ui/core/colors";

export const IconButton = withStyles({
  colorPrimary: {
    color: amber[500],
  },
  colorSecondary: {
    color: amber.A700,
  },
})(MaterialIconButton);

export const TableRow = withStyles({
  root: {
    "&.party-ALP": {
      backgroundColor: red[100],
    },
    "&.party-LNP": {
      backgroundColor: blue[100],
    },
    "&.party-GRN": {
      backgroundColor: green[100],
    },
    "&.party-OTH": {
      backgroundColor: brown[100],
    },
  },
})(MaterialTableRow);

export const Chip = withStyles({
  root: {
    "&.party-ALP": {
      backgroundColor: red[500],
    },
    "&.party-LNP": {
      backgroundColor: blue[500],
    },
    "&.party-GRN": {
      backgroundColor: green[500],
    },
    "&.party-OTH": {
      backgroundColor: brown[500],
    },
    "&.party-UND": {
      backgroundColor: grey[500],
    },
    color: "white !important",
  },
})(MaterialChip);

export const Tabs = withStyles({
  flexContainer: {
    justifyContent: "space-around",
  },
  indicator: {
    backgroundColor: `${amber[500]} !important`,
  },
})(MaterialTabs);

export const TopBar = withStyles({
  colorPrimary: {
    backgroundColor: "black !important",
  },
})(MaterialAppBar);

export const BottomBar = withStyles({
  colorSecondary: {
    backgroundColor: `${grey[200]} !important`,
    color: "black !important",
    padding: 12,
  },
  positionFixed: {
    top: "auto !important",
    bottom: 0,
  },
  root: {
    flexDirection: "row !important",
    justifyContent: "space-around !important",
  },
})(MaterialAppBar);
