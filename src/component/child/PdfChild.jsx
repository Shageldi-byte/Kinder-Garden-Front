import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {GENDER, SERVER_ADDRESS} from "../../common/constant.mjs";
import {deepOrange} from "@mui/material/colors";
import {Avatar} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    },
});

const PdfChild = (props) => {
    const [child, setChild] = useState(props.child);
    return (
        <ThemeProvider theme={lightTheme}>
            <center>
                <div style={{display:'inline-block',padding:'22px'}} ref={props.componentRef}>
                    <TableContainer component={Paper}>
                        <Table sx={{width: 650}} size="medium" aria-label="a dense table">
                            <TableBody>
                                <TableRow
                                    key={`keyy1`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Suraty:
                                    </TableCell>
                                    <TableCell align="right">
                                        <img src={child != '' ? `${SERVER_ADDRESS}/public/image/children/${child.child_image}` : ''} alt={'child-imf'}
                                            style={{width:'100px'}}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    key={`keyy1`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Doly ady:
                                    </TableCell>
                                    <TableCell align="right">
                                        {`${child.name} ${child.surname} ${child.middle_name}`}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Topary:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.group_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    key={`keyy3`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Doglan güni:
                                    </TableCell>
                                    <TableCell align="right">
                                        {`${new Date(child.dob).getFullYear()}-${new Date(child.dob).getMonth() + 1}-${new Date(child.dob).getDate()}`}
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Kakasynyň ady:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.father_fullname}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Kakasynyň telefon belgisi:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.father_phone_number}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Kakasynyň işleýän ýeri:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.father_job_address}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Ejesiniň ady:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.father_fullname}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Ejesiniň telefon belgisi:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.mother_phone_number}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Ejesiniň işleýän ýeri:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.mother_job_address}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Enekesi:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.child_caregiver}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Enekesiniň telefon belgisi:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.caregiver_phone_number}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Çagalar bagyna kabul edilen senesi:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.kinder_garden_entered_date}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Çagalar bagyny tamamlaýan senesi:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.kinder_garden_exited_date}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Jynsy:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.gender == GENDER.MAN ? 'Erkek' : 'Zenan'}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Ýaşaýan salgysy:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.address}
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    key={`keyy2`}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        Doly maglumaty:
                                    </TableCell>
                                    <TableCell align="right">
                                        {child.full_information}
                                    </TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </center>
        </ThemeProvider>
    )
}

export default PdfChild;