import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Stack, Typography} from '@mui/material';
import {AxiosInstance} from "../../api/Axios/AxiosInstance";
import {showError, showSuccess, showWarning} from "../../alert/Alert.mjs";
import {Add, ArrowCircleRight} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Spacer from "react-spacer";
import {ToastContainer} from "react-toastify";
import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Group = () => {

    const [list, setList] = useState([]);

    const [filterAnchor, setFilterAnchor] = React.useState(null);
    const openFilter = Boolean(filterAnchor);

    const [name, setName] = useState('');
    const [g_number, setGNumber] = useState('');
    const [room, setRoom] = useState('');

    const handleFilterOpen = (event) => {
        setFilterAnchor(event.currentTarget);
    };


    const handleFilterClose = () => {
        setFilterAnchor(null);
    }

    const getData = () => {
        AxiosInstance.get('/admin/get-group')
            .then((response) => {
                if (!response.data.error) {
                    setList(response.data.body);
                } else {
                    showWarning('Error');
                }
            })
            .catch(err => {
                showError(err + "");
            })
    };

    useEffect(() => {
        getData();
    }, []);

    const addGroup=()=>{
        if(name === '' || g_number==='' || room===''){
            showWarning('Maglumatlary doly girizin!');
        } else {
            const body = {
                group_name:name,
                group_number:g_number,
                group_room:room
            };
            setName('');
            setGNumber('');
            setRoom('');
            AxiosInstance.post('/admin/add-group',body)
                .then(response => {
                    if(!response.data.error){
                        showSuccess('Hasaba alyndy!');
                        getData();
                    } else {
                        showWarning("Error");
                    }
                })
                .catch(err => {
                    showError(err+"");
                })
        }
    }

    return (
        <div>
            <ToastContainer/>
            <Stack justifyContent='space-between' direction='row' sx={{mb: 2}}>
                <Typography>Toparlar</Typography>
                <Button
                    color="primary"
                    aria-label="filter"
                    id="filter-button"
                    aria-controls={openFilter ? 'filter-menu' : undefined}
                    aria-expanded={openFilter ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleFilterOpen}
                    startIcon={<Add/>}
                    component="span">
                    Topar Goşmak
                </Button>

                <Menu
                    id="filter-menu"
                    MenuListProps={{
                        'aria-labelledby': 'filter-button',
                    }}
                    anchorEl={filterAnchor}
                    open={openFilter}
                    onClose={handleFilterClose}
                    PaperProps={{
                        style: {
                            padding: '20px'
                        },
                    }}
                >

                    <Typography>Topar Goşmak:</Typography>
                    <Spacer height={'12px'}/>
                    <Stack>
                        <Grid container spacing={2} sx={{maxWidth: '250px'}}>
                            <Grid item xs={12}>
                                <TextField id="filled-basic" fullWidth={true} label="Topar ady" variant="filled"
                                           value={name} onChange={e => setName(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="filled-basic" fullWidth={true} label="Topar belgisi" variant="filled"
                                           value={g_number} onChange={e => setGNumber(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="filled-basic" fullWidth={true} label="Topar otagy" variant="filled"
                                           value={room} onChange={e=>setRoom(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button startIcon={<Add/>} fullWidth={true} variant={'outlined'} onClick={addGroup}>
                                    Goş
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </Menu>
            </Stack>
            <TableContainer component={Paper} sx={{mt: 3}}>
                <Table sx={{minWidth: 650}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Topar ady</StyledTableCell>
                            <StyledTableCell align="right">Topar belgisi</StyledTableCell>
                            <StyledTableCell align="right">Topar otagy</StyledTableCell>
                            <StyledTableCell align="right">Çaga sany</StyledTableCell>
                            <StyledTableCell align="right">Çagalaryny gör</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item, i) => {
                            return (
                                <StyledTableRow key={i} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <StyledTableCell component="th" scope="row">
                                            {item.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{item.group_name}</StyledTableCell>
                                    <StyledTableCell align="right">{item.group_number}</StyledTableCell>
                                    <StyledTableCell align="right">{item.group_room}</StyledTableCell>
                                    <StyledTableCell align="right">{item.child_count}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <NavLink to={`/children?group_id=${item.id}`} style={{textDecoration:'none'}}>
                                            <IconButton><ArrowCircleRight/></IconButton>
                                        </NavLink>
                                    </StyledTableCell>
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
