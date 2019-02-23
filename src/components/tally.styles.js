import { makeStyles, styled } from "@material-ui/styles";
import {
  Select as MaterialSelect,
  TableRow as MaterialTableRow,
} from "@material-ui/core";
import {
  Star as MaterialStar,
  StarBorder as MaterialStarBorder,
} from "@material-ui/icons";
import { amber, blue, brown, green, purple, red } from "@material-ui/core/colors";

const colorMap = {
  ALP: red[50],
  LNP: blue[50],
  GRN: green[50],
  OTH: brown[50],
};

export const Wrapper = styled("div")({
  color: "black",
  paddingTop: 72,
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
    backgroundColor: party ? colorMap[party] : "inherit",
  }),
);

export const GenericIcon = styled("span")({
  fontSize: "1.7em",
  lineHeight: 1.1,
});

export const useAppBarClasses = makeStyles({
  colorPrimary: {
    backgroundColor: `${purple[900]} !important`,
  },
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
