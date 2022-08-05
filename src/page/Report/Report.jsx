import React, {useEffect, useState} from 'react'
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Stack, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../style/Report/report.css'
import {AxiosInstance} from "../../api/Axios/AxiosInstance";
import {showError, showWarning} from "../../alert/Alert.mjs";
import {GENDER, LOGTYPE, SERVER_ADDRESS} from "../../common/constant.mjs";
import {NavLink} from "react-router-dom";


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



const Report = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const open = Boolean(anchorEl);
  const openFilter = Boolean(filterAnchor);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterOpen = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleFilterClose = () => {
    setFilterAnchor(null);
  }

  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [list,setList] = useState([]);

  const getData=async()=>{
    const body = {
        type:type
    };
    await AxiosInstance.post('/admin/get-report',body)
        .then(response => {
            if(!response.data.error){
              setList(response.data.body);
            } else {
              showWarning('Error');
            }
        })
        .catch(err=>{
          showError(err+"");
        })
  };

  useEffect(()=>{
      getData();
  },[]);

  useEffect(()=>{
    getData();
  },[type]);

  const gotoView=(child_id)=>{

  }

  return (
    <div>
      <Stack justifyContent='space-between' direction='row'>
        <Typography>Şu günki hasabatlar</Typography>
        <IconButton
          color="primary"
          aria-label="filter"
          id="filter-button"
          aria-controls={openFilter ? 'filter-menu' : undefined}
          aria-expanded={openFilter ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleFilterOpen}
          component="span">
          <FilterListIcon />
        </IconButton>
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

          <Typography>Filtr:</Typography>
          <Stack>
            <FormControl sx={{ mt: 3, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Görnüşi</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={type}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Hiçisi</em>
                </MenuItem>
                <MenuItem value={1}>Gija galan</MenuItem>
                <MenuItem value={2}>Gelmedik</MenuItem>
                <MenuItem value={3}>Sms gitmedik</MenuItem>
                <MenuItem value={4}>Giriş</MenuItem>
                <MenuItem value={5}>Çykyş</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Menu>
      </Stack>
      <TableContainer component={Paper}>
        <Table  sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">F.A.A</StyledTableCell>
              <StyledTableCell align="right">Topary</StyledTableCell>
              <StyledTableCell align="right">Suraty</StyledTableCell>
              <StyledTableCell align="right">Wagty</StyledTableCell>
              <StyledTableCell align="right">Hossary</StyledTableCell>
              <StyledTableCell align="right">Tel</StyledTableCell>
              <StyledTableCell align="right">Öý salgy</StyledTableCell>
              <StyledTableCell align="right">Bellik</StyledTableCell>
              <StyledTableCell align="right">SMS</StyledTableCell>
              <StyledTableCell align="right">More</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {list.map((item,i)=>{
            return(
              <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="right">{`${item.name} ${item.surname}`}</StyledTableCell>
              <StyledTableCell align="right">{item.group_name}</StyledTableCell>
              <StyledTableCell align="right"><img src={`${SERVER_ADDRESS}/public/image/children/${item.child_image}`} alt="img" className="child-image"/></StyledTableCell>
              <StyledTableCell align="right">{item.time_log}</StyledTableCell>
              <StyledTableCell align="right">{item.phone_number_gender==GENDER.MAN?item.father_fullname:item.mother_fullname}</StyledTableCell>
              <StyledTableCell align="right">{item.phone_number_gender==GENDER.MAN?item.father_phone_number:item.mother_phone_number}</StyledTableCell>
              <StyledTableCell align="right">{item.address}</StyledTableCell>
              <StyledTableCell align="right">{item.type==LOGTYPE.ENTER?"Giriş":"Çykyş"}</StyledTableCell>
              <StyledTableCell align="right">{item.is_delivery_sms?"Sms gitdi":"Sms gitmedi"}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem key={'info'} onClick={handleClose}>
                    <NavLink to={`/childview/${item.child_id}`} style={{textDecoration:'none'}}><Typography color={'secondary'}>Çaganyň maglumaty</Typography></NavLink>
                  </MenuItem>
                </Menu>
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

export default Report
