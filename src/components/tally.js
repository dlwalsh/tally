import React from "react";
import { IconButton, Table, TableBody, TableCell, TableHead } from "@material-ui/core";
import { Select, Star, StarBorder, TableRow, Wrapper } from "./tally.styles";
import { useDistricts } from "../hooks/use-districts";
import { districts as rawDistricts } from "../data";

const Tally = () => {
  const { districts, onPartyChange, onToggleFeatured } = useDistricts(rawDistricts);

  return (
    <Wrapper>
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
          {districts.map(dist => (
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
                  {dist.featured ? <Star /> : <StarBorder />}
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
