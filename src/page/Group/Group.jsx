import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Group = () => {

  const list = [
    {
      sms: 1,
      state: 1
    },
    {
      sms: 0,
      state: 1
    },
    {
      sms: 1,
      state: 2
    }
  ]
  return (
    <div>
      <Typography>Toparlar</Typography>
      <TableContainer component={Paper} sx={{mt:3}}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Topar ady</StyledTableCell>
              <StyledTableCell align="right">Topar belgisi</StyledTableCell>
              <StyledTableCell align="right">Topar otagy</StyledTableCell>
              <StyledTableCell align="right">Çaga sany</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, i) => {
              return (
                <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell component="th" scope="row">
                    1
                  </StyledTableCell>
                  <StyledTableCell align="right">Alemgoshar</StyledTableCell>
                  <StyledTableCell align="right">3131</StyledTableCell>
                  <StyledTableCell align="right">2329</StyledTableCell>
                  <StyledTableCell align="right">30</StyledTableCell>
                </StyledTableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Group
