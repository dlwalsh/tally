import React from "react";
import { IconButton, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import { useDistricts } from "../hooks/use-districts";
import { districts as rawDistricts } from "../data";

const Tally = () => {
  const { districts, onPartyChange, onToggleFeatured } = useDistricts(rawDistricts);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>District</TableCell>
          <TableCell>Incumbent</TableCell>
          <TableCell>Winner</TableCell>
          <TableCell>Featured</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {districts.map(dist => (
          <TableRow key={dist.id}>
            <TableCell component="th" scope="row">
              {dist.name}
            </TableCell>
            <TableCell>{dist.incumbent}</TableCell>
            <TableCell>
              <Select
                onChange={({ target }) => onPartyChange(dist.id, target.value)}
                value={dist.party}
              >
                <MenuItem value="" />
                <MenuItem value="LNP">LNP</MenuItem>
                <MenuItem value="ALP">ALP</MenuItem>
                <MenuItem value="GRN">GRN</MenuItem>
                <MenuItem value="OTH">OTH</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => onToggleFeatured(dist.id)}>
                {dist.featured ? <Star /> : <StarBorder />}
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tally;
