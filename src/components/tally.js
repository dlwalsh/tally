import React, { useEffect, useMemo, useState } from "react";
import { filter, length, pipe, prop, propEq } from "ramda";
import { AppBar, IconButton, Tab, Tabs, Table, TableBody, TableCell, TableHead } from "@material-ui/core";
import { SwapHoriz, Star, ViewList } from "@material-ui/icons";
import {
  Chip,
  GenericIcon,
  Select,
  StarFilled,
  StarBorder,
  TableRow,
  Wrapper,
  useTabClasses,
  useTabsClasses,
  useTopBarClasses,
  useBottomBarClasses,
} from "./tally.styles";
import { useDistricts } from "../hooks/use-districts";
import {
  districts as rawDistricts,
  storageKey,
} from "../data";

const filterChanging = filter(dist => dist.party && dist.party !== dist.incumbent);
const filterUndecided = filter(propEq("party", ""));
const filterFeatured = filter(prop("featured"));
const lengthWhere = pipe(filter, length);

const storage = localStorage.getItem(storageKey);

const Tally = () => {
  const { districts, onPartyChange, onToggleFeatured } = useDistricts(
    storage ? JSON.parse(storage) : rawDistricts,
  );
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
  const topBarClasses = useTopBarClasses();
  const bottomBarClasses = useBottomBarClasses();
  const tabClasses = useTabClasses();
  const tabsClasses = useTabsClasses();

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(districts));
  }, [districts]);

  return (
    <Wrapper>
      <AppBar position="fixed" classes={topBarClasses} color="primary">
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
      <AppBar position="fixed" classes={bottomBarClasses} color="secondary">
        <Chip party="LNP" label={`LNP ${lengthWhere(propEq("party", "LNP"), districts)}`} />
        <Chip party="ALP" label={`ALP ${lengthWhere(propEq("party", "ALP"), districts)}`} />
        <Chip party="GRN" label={`GRN ${lengthWhere(propEq("party", "GRN"), districts)}`} />
        <Chip party="OTH" label={`OTH ${lengthWhere(propEq("party", "OTH"), districts)}`} />
        <Chip party="UND" label={`UND ${lengthWhere(propEq("party", ""), districts)}`} />
      </AppBar>
    </Wrapper>
  );
};

export default Tally;
