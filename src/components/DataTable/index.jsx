import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React, { Fragment } from "react";

const DataTable = ({data1, data2}) => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head">Brand</TableCell>
              <TableCell>{data1.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Model</TableCell>
              <TableCell>{data1.model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Manufacturer name</TableCell>
              <TableCell>{data1.manufName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Manufacturer Location</TableCell>
              <TableCell>{data1.manufLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Manufacturing Timestamp</TableCell>
              <TableCell>{data1.manufTimestamp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Owner Address</TableCell>
              <TableCell>{data2.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Owner Name</TableCell>
              <TableCell>
                {data2.name
                  ? data2.name
                  : data1.manufName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Owner Location</TableCell>
              <TableCell>
                {data2.location
                  ? data2.location
                  : data1.manufLocation}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default DataTable;
