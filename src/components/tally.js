import React, { useMemo, useState } from "react";
import { filter, prop, propEq } from "ramda";
import { AppBar, IconButton, Tab, Tabs, Table, TableBody, TableCell, TableHead } from "@material-ui/core";
import { SwapHoriz, Star, ViewList } from "@material-ui/icons";
import {
  GenericIcon,
  Select,
  StarFilled,
  StarBorder,
  TableRow,
  Wrapper,
  useAppBarClasses,
  useTabClasses,
  useTabsClasses,
} from "./tally.styles";
import { useDistricts } from "../hooks/use-districts";
import { districts as rawDistricts } from "../data";

const filterChanging = filter(dist => dist.party && dist.party !== dist.incumbent);
const filterUndecided = filter(propEq("party", ""));
const filterFeatured = filter(prop("featured"));

const Tally = () => {
  const { districts, onPartyChange, onToggleFeatured } = useDistricts(rawDistricts);
  const [filterValue, setFilterValue] = useState(0);
  const filteredDistricts = useMemo(() => {
    if (filterValue === 1) {
      return filterChanging(districts);
    }
    if (filterValue === 2) {
      return filterUndecided(districts);
    }
    if (filterValue === 3) {
      return filterFeatured(districts);
    }
    return districts;
  }, [districts, filterValue]);
  const appBarClasses = useAppBarClasses();
  const tabClasses = useTabClasses();
  const tabsClasses = useTabsClasses();

  return (
    <Wrapper>
      <AppBar position="fixed" classes={appBarClasses} color="primary">
        <Tabs
          classes={tabsClasses}
          value={filterValue}
          onChange={(event, value) => setFilterValue(value)}
          scrollButtons="off"
        >
          <Tab classes={tabClasses} label="All" icon={<ViewList />} />
          <Tab classes={tabClasses} label="Changing" icon={<SwapHoriz />} />
          <Tab classes={tabClasses} label="Undecided" icon={<GenericIcon>?</GenericIcon>} />
          <Tab classes={tabClasses} label="Featured" icon={<Star />} />
        </Tabs>
      </AppBar>
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell padding="dense">District</TableCell>
            <TableCell>Incumbent</TableCell>
            <TableCell>Winner</TableCell>
            <TableCell>Featured</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDistricts.map(dist => (
            <TableRow key={dist.id} party={dist.party}>
              <TableCell component="th" padding="dense" scope="row">
                {dist.name}
              </TableCell>
              <TableCell>{dist.incumbent}</TableCell>
              <TableCell>
                <Select
                  native
                  onChange={({ target }) => onPartyChange(dist.id, target.value)}
                  value={dist.party}
                >
                  <option value="">UND</option>
                  <option value="LNP">LNP</option>
                  <option value="ALP">ALP</option>
                  <option value="GRN">GRN</option>
                  <option value="OTH">OTH</option>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onToggleFeatured(dist.id)}>
                  {dist.featured ? <StarFilled /> : <StarBorder />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};

export default Tally;
