import { makeStyles, styled } from "@material-ui/styles";
import {
  Chip as MaterialChip,
  Select as MaterialSelect,
  TableRow as MaterialTableRow,
} from "@material-ui/core";
import {
  Star as MaterialStar,
  StarBorder as MaterialStarBorder,
} from "@material-ui/icons";
import { amber, blue, brown, green, grey, purple, red } from "@material-ui/core/colors";

export const Wrapper = styled("div")({
  color: "black",
  paddingTop: 72,
  paddingBottom: 60,
});

export const Select = styled(MaterialSelect)({});

export const StarFilled = styled(MaterialStar)({
  color: amber[500],
});

export const StarBorder = styled(MaterialStarBorder)({
  color: amber.A700,
});

export const TableRow = styled(MaterialTableRow)(
  ({ party }) => ({
    backgroundColor: {
      ALP: red[100],
      LNP: blue[100],
      GRN: green[100],
      OTH: brown[100],
    }[party] || "transparent",
  }),
);

export const Chip = styled(MaterialChip)(
  ({ party }) => ({
    backgroundColor: {
      LNP: `${blue[500]} !important`,
      ALP: `${red[500]} !important`,
      GRN: `${green[500]} !important`,
      OTH: `${brown[500]} !important`,
      UND: `${grey[500]} !important`,
    }[party],
    color: "white !important",
  }),
);

export const GenericIcon = styled("span")({
  fontSize: "1.7em",
  lineHeight: 1.1,
});

export const useTabsClasses = makeStyles({
  flexContainer: {
    justifyContent: "space-around",
  },
  indicator: {
    backgroundColor: `${amber[500]} !important`,
  },
});

export const useTabClasses = makeStyles({});

export const useTopBarClasses = makeStyles({
  colorPrimary: {
    backgroundColor: `${purple[900]} !important`,
  },
});

export const useBottomBarClasses = makeStyles({
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
});
