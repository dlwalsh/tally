import React, { useEffect, useMemo, useState } from "react";
import { filter, length, pipe, prop, propEq } from "ramda";
import { IconButton, Select, Tab, Table, TableBody, TableCell, TableHead } from "@material-ui/core";
import { SwapHoriz, Star, ViewList } from "@material-ui/icons";
import {
  BottomBar,
  Chip,
  GenericIcon,
  StarFilled,
  StarBorder,
  TableRow,
  Tabs,
  TopBar,
  Wrapper,
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

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(districts));
  }, [districts]);

  return (
    <Wrapper>
      <TopBar position="fixed" color="primary">
        <Tabs
          value={filterValue}
          onChange={(event, value) => setFilterValue(value)}
          scrollButtons="off"
        >
          <Tab label="All" icon={<ViewList />} />
          <Tab label="Changing" icon={<SwapHoriz />} />
          <Tab label="Undecided" icon={<GenericIcon>?</GenericIcon>} />
          <Tab label="Featured" icon={<Star />} />
        </Tabs>
      </TopBar>
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
            <TableRow key={dist.id} className={dist.party ? `party-${dist.party}` : undefined}>
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
      <BottomBar position="fixed" color="secondary">
        <Chip
          className="party-LNP"
          label={`LNP ${lengthWhere(propEq("party", "LNP"), districts)}`}
        />
        <Chip
          className="party-ALP"
          label={`ALP ${lengthWhere(propEq("party", "ALP"), districts)}`}
        />
        <Chip
          className="party-GRN"
          label={`GRN ${lengthWhere(propEq("party", "GRN"), districts)}`}
        />
        <Chip
          className="party-OTH"
          label={`OTH ${lengthWhere(propEq("party", "OTH"), districts)}`}
        />
        <Chip
          className="party-UND"
          label={`UND ${lengthWhere(propEq("party", ""), districts)}`}
        />
      </BottomBar>
    </Wrapper>
  );
};

export default Tally;
