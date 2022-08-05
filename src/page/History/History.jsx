import React, {useEffect} from 'react'
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Grid, Stack, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../style/Report/report.css';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import {AxiosInstance} from "../../api/Axios/AxiosInstance";
import {showError, showWarning} from "../../alert/Alert.mjs";
import {useState} from "react";
import {Pagination} from "@mui/lab";
import {GENDER, LOGTYPE, SERVER_ADDRESS} from "../../common/constant.mjs";
import {NavLink} from "react-router-dom";
import Spacer from "react-spacer";


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


const History = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const open = Boolean(anchorEl);
  const openFilter = Boolean(filterAnchor);
  const [groups, setGroups] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [sms, setSms] = useState('');
  const [child_id, setChildId] = useState('');
  const [group_id, setGroupId] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [children, setChildren] = useState([]);
  const [list, setList] = useState([]);
  let limit = 40;

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


  const handleChange = (event) => {
    setType(event.target.value);
  };


  const [value, setValue] = React.useState('');

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };


  const getGroups = async () => {
    await AxiosInstance.get('/admin/get-group')
        .then((response) => {
          if (!response.data.error) {
            setGroups(response.data.body);
          } else {
            showWarning('Error');
          }
        })
        .catch(err => {
          showError(err + "");
        })
  };

  const getChildren = async () => {
    const body = {
      group: '',
      month: ''
    };
    await AxiosInstance.post('/admin/get-children', body)
        .then(response => {
          if (!response.data.error) {
            setChildren(response.data.body);
          } else {
            showWarning('Error');
          }
        })
        .catch(err => {
          showError(err + "");
        })
  };

  const getData = async () => {
    const body = {
      startDate: startDate,
      endDate: endDate,
      type: type,
      sms: sms,
      child_id: child_id,
      group_id: group_id,
      page: page,
      limit: limit
    };
    await AxiosInstance.post('/admin/get-history', body)
        .then(response => {
          if (!response.data.error) {
            setList(response.data.body.logs);
            if (page == 1) {
              setPageCount(response.data.body.page_count);
            }
          } else {
            showWarning('Error');
          }
        })
        .catch(err => {
          showError(err + "");
        })
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setType('');
    setSms('');
    setChildId('');
    setGroupId('');
    setPage(1);
    setValue('');
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getGroups();
    getChildren();
    getData();
  }, []);

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handleStartDate = (newValue) => {
    let date = new Date(newValue);
    setStartDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
  };

  const handleEndDate = (newValue) => {
    let date = new Date(newValue);
    setEndDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
  };



  useEffect(()=>{
   if(value!='' && value != null){
     setChildId(value.id);
   } else {
     setChildId('');
   }
  },[value]);

  return (
      <div>
        <Stack justifyContent='space-between' direction='row'>
          <Typography>Umumy hasabatlar</Typography>
          <IconButton
              color="primary"
              aria-label="filter"
              id="filter-button"
              aria-controls={openFilter ? 'filter-menu' : undefined}
              aria-expanded={openFilter ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleFilterOpen}
              component="span">
            <FilterListIcon/>
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

            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography>Filtr:</Typography>
              <Button startIcon={<ClearIcon/>} color="error" onClick={clearFilter}>Arassala</Button>
            </Stack>
            <Stack sx={{mt: 2}}>
              <Grid container spacing={2} sx={{width: '500px'}}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Başlangyç sene"
                        inputFormat="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        value={startDate}
                        onChange={handleStartDate}
                        renderInput={(params) => <TextField {...params}/>}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Ahyrky sene"
                        inputFormat="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        value={endDate}
                        onChange={handleEndDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Görnüşi</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Görnüşi"
                        onChange={e => setType(e.target.value)}
                    >
                      {/*<MenuItem value={20}>Gelmedik</MenuItem>*/}
                      <MenuItem value={2}>Giriş</MenuItem>
                      <MenuItem value={3}>Çykyş</MenuItem>
                      <MenuItem value={1}>Gija galan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sms ýagdaýy</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sms}
                        label="Sms ýagdaýy"
                        onChange={e => setSms(e.target.value)}
                    >
                      <MenuItem value={1}>Gitdi</MenuItem>
                      <MenuItem value={2}>Gitmedi</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      disablePortal
                      id="combo-box-demo"
                      autoHighlight
                      options={children}
                      getOptionLabel={(option) => typeof option === "undefined" || option == null || option == ''?'':`${option.name} ${option.surname} ${option.middle_name}`}
                      renderInput={(params) => <TextField {...params} label="Çaga F.A.A"/>}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Toparlar</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={group_id}
                        label="Toparlar"
                        onChange={e => setGroupId(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Hiçisi</em>
                      </MenuItem>
                      {
                        groups.map((item, index) => {
                          return (
                              <MenuItem value={item.id} key={`key___${index}`}>{item.group_name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{width: '100%'}} variant={'contained'} onClick={getData}>
                    Filterle
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Menu>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">F.A.A</StyledTableCell>
                <StyledTableCell align="right">Topary</StyledTableCell>
                <StyledTableCell align="right">Suraty</StyledTableCell>
                <StyledTableCell align="right">Senesi</StyledTableCell>
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
              {list.map((item, i) => {
                let date = new Date(item.date_log);
                return (
                    <StyledTableRow key={i} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                      <StyledTableCell component="th" scope="row">
                        {item.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">{`${item.name} ${item.surname}`}</StyledTableCell>
                      <StyledTableCell align="right">{item.group_name}</StyledTableCell>
                      <StyledTableCell align="right"><img
                          src={`${SERVER_ADDRESS}/public/image/children/${item.child_image}`} alt="img"
                          className="child-image"/></StyledTableCell>
                      <StyledTableCell align="right">{`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}</StyledTableCell>
                      <StyledTableCell align="right">{`${item.time_log}`}</StyledTableCell>
                      <StyledTableCell
                          align="right">{item.phone_number_gender == GENDER.MAN ? item.father_fullname : item.mother_fullname}</StyledTableCell>
                      <StyledTableCell
                          align="right">{item.phone_number_gender == GENDER.MAN ? item.father_phone_number : item.mother_phone_number}</StyledTableCell>
                      <StyledTableCell align="right">{item.address}</StyledTableCell>
                      <StyledTableCell align="right">{item.type == LOGTYPE.ENTER ? "Giriş" : "Çykyş"}</StyledTableCell>
                      <StyledTableCell
                          align="right">{item.is_delivery_sms ? "Sms gitdi" : "Sms gitmedi"}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                          <MoreVertIcon/>
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
                            <NavLink to={`/childview/${item.child_id}`} style={{textDecoration: 'none'}}><Typography
                                color={'secondary'}>Çaganyň maglumaty</Typography></NavLink>
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
        <Spacer height={'20px'}/>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
          <Pagination count={pageCount} fullWidth={true} variant="outlined" color="primary" page={page} onChange={handlePage}/>
        </Stack>
      </div>
  )
}

export default History
