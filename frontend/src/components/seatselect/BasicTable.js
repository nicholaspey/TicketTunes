import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BasicSelect from "./BasicSelect";
import { newClickCount } from './ButtonGrid'; // Adjust the path to your source file

function createData(TicketType, Price, Quantity, TotalPrice) {
  return { TicketType, Price, Quantity, TotalPrice };
}

const rows = [
  createData('Standard', '46.00',BasicSelect,),

];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{backgroundColor: "#5522CC",}}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Ticket Type</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Quantity</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.TicketType}
              </TableCell>
              <TableCell align="right">${row.Price}</TableCell>
              <TableCell align="right">{newClickCount}</TableCell>
              <TableCell align="right">${newClickCount*row.Price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}