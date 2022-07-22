import React from 'react'
import ChildCard from '../../component/child/ChildCard';
import Grid from '@mui/material/Grid';
import { Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FileBrowse from '../../component/filebrowse/FileBrowse';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
  display: 'none',
});


const Children = () => {

  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const openFilter = Boolean(filterAnchor);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleFilterOpen = (event) => {
    setFilterAnchor(event.currentTarget);
  };


  const handleFilterClose = () => {
    setFilterAnchor(null);
  }

  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };


  const list = [
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    },
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    },
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    },
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    },
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    },
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    },
    {
      nama: 'Shageldi Alyyew',
      image: '/images/child.webp',
      desc: 'Hossary:Alyyew Nazar,\nTopary:Alemgoshar,\nEnekesi:Maral Saparowa'
    }
  ];

  let months=[
    {
      id:1,
      value:'Ýanwar'
    },
    {
      id:2,
      value:'Fewral'
    },
    {
      id:3,
      value:'Mart'
    },
    {
      id:4,
      value:'Aprel'
    },
    {
      id:5,
      value:'Maý'
    },
    {
      id:6,
      value:'Iýun'
    },
    {
      id:7,
      value:'Iýul'
    },
    {
      id:8,
      value:'Awgust'
    },
    {
      id:9,
      value:'Sentýabr'
    },
    {
      id:10,
      value:'Oktýabr'
    },
    {
      id:11,
      value:'Noýabr'
    },
    {
      id:12,
      value:'Dekabr'
    }
  ]
  return (
    <div>
      <Stack justifyContent='space-between' direction='row' sx={{mb:2}}>
        <Typography>Çagalar sanawy</Typography>
        <Stack direction='row'>
          <Button variant="text" onClick={handleClickOpen} startIcon={<AddIcon />}>
            Çaga goşmak
          </Button>
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
        </Stack>
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
            <Grid container spacing={2} sx={{minWidth:'200px'}}>
              <Grid item xs={12}>
                <FormControl sx={{ mt: 3, width: '100%' }} size="small">
                  <InputLabel id="demo-select-small">Topary</InputLabel>
                  <Select
                    fullWidth={true}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={type}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Hiçisi</em>
                    </MenuItem>
                    <MenuItem value={10}>Alemgosar</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl sx={{ mt: 1, width: '100%' }} size="small">
                  <InputLabel id="demo-select-small">Doglan aýy</InputLabel>
                  <Select
                    fullWidth={true}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={type}
                    label="Doglan aýy"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Hiçisi</em>
                    </MenuItem>
                    {
                      months.map((item,i)=>{
                        return(
                          <MenuItem value={item.id} key={`month_${i}`}>{item.value}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </Menu>
      </Stack>
      <Grid container direction={{ xs: 'column', md: 'row' }} spacing={2} columns={12}>
        {list.map((element, i) => {
          return (
            <Grid item sm={1} md={2} lg={3} key={`Grid--${i}`}>
              <ChildCard item={element} index={i} />
            </Grid>
          )
        })}
      </Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Çaga goşmak
            </Typography>

            <Button color={'inherit'} sx={{mr:1}} startIcon={<DownloadIcon/>}>QR code</Button>
            
            <Button autoFocus variant={'outlined'} onClick={handleClose}>
              Ýatda saklat
            </Button>
          </Toolbar>
        </AppBar>
        
        <Grid container  direction={{ xs:'column',md: 'column', lg: 'row' }} spacing={2} sx={{padding:'22px'}}>
        
          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Ady" variant="filled" />
          </Grid>
          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Familiýasy" variant="filled" />
          </Grid>
          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Atasynyň ady" variant="filled" />
          </Grid>
          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Ýaşy" type='number' variant="filled" />
          </Grid>
          <Grid item lg={3}>
          <TextField
          id="filled-select-currency"
          select
          fullWidth
          label="Topary"
          variant="filled"
        >
            <MenuItem key={'key'} value={'Alemgoshar'}>
              Alemgosar
            </MenuItem>
        </TextField>
          </Grid>

          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Kakasynyň doly ady" variant="filled" />
          </Grid>

          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Kakasynyň telefon belgisi" variant="filled" />
          </Grid>

          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Ejesiniň doly ady" variant="filled" />
          </Grid>

          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Ejesiniň telefon belgisi" variant="filled" />
          </Grid>

          <Grid item lg={3}>
          <TextField
          id="filled-select-currency"
          select
          fullWidth
          label="Sms ugratmaly telefon belgisi"
          variant="filled"
        >
            <MenuItem key={'key1'} value={'1'}>
              Kakasy
            </MenuItem>
            <MenuItem key={'key2'} value={'2'}>
              Ejesi
            </MenuItem>
        </TextField>  
          </Grid>

          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Enekesiniň doly ady" variant="filled" />
          </Grid>

          <Grid item lg={3}>
            <TextField id="filled-basic" fullWidth label="Enekesiniň telefon belgisi" variant="filled" />
          </Grid>

          <Grid item lg={3}>
          <label htmlFor="contained-button-file1">
              <Input accept="image/*" id="contained-button-file1" type="file" />
              <FileBrowse component="span" image={'Çaga suraty'}>
              </FileBrowse>
          </label>
        </Grid>

        <Grid item lg={3}>
          <label htmlFor="contained-button-file2">
              <Input id="contained-button-file2" type="file" />
              <FileBrowse component="span" image={'Dogluş hakynda şahadatnama'}>
              </FileBrowse>
          </label>
        </Grid>

        <Grid item lg={3}>
          <label htmlFor="contained-button-file3">
              <Input id="contained-button-file3" type="file" />
              <FileBrowse component="span" image={'Üç arka maglumaty'}>
              </FileBrowse>
          </label>
        </Grid>

        <Grid item lg={3}>
        <TextField
            fullWidth
           id="filled-textarea"
           label={'Salgysy'}
           placeholder={'Salgysy...'}
            multiline
           rows={4}
           variant="filled"
        />
        </Grid>
        <Grid item lg={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <MobileDatePicker
                    sx={{ minWidth: '100%' }}
                    label="Çagalar bagyna gelen wagty"
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
        </Grid>

        <Grid item lg={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <MobileDatePicker
                    fullWidth
                    sx={{ width: '100%' }}
                    label="Çagalar bagyndan gitmeli wagty"
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
        </Grid>

        <Grid item lg={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <MobileDatePicker
                    sx={{ minWidth: '100%' }}
                    label="Doglan güni"
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
        </Grid>
        

        <Grid item lg={3}>
          <TextField
          id="filled-select-currency"
          select
          fullWidth
          label="Jynsy"
          variant="filled"
        >
            <MenuItem key={'key4'} value={'1'}>
              Erkek
            </MenuItem>
            <MenuItem key={'key5'} value={'2'}>
              Aýal
            </MenuItem>
        </TextField>  
          </Grid>


            <Grid item lg={4}>
        <TextField
            fullWidth
           id="filled-textarea"
           label={'Doly maglumaty'}
           placeholder={'Doly maglumaty...'}
            multiline
           rows={4}
           variant="filled"
        />
        </Grid>

        <Grid item lg={4}>
        <TextField
            fullWidth
           id="filled-textarea"
           label={'Kakasynyň iş ýeri'}
           placeholder={'Kakasynyň iş ýeri...'}
            multiline
           rows={4}
           variant="filled"
        />
        </Grid>

        <Grid item lg={4}>
        <TextField
            fullWidth
           id="filled-textarea"
           label={'Ejesiniň iş ýeri'}
           placeholder={'Ejesiniň iş ýeri...'}
            multiline
           rows={4}
           variant="filled"
        />
        </Grid>


        </Grid>
      </Dialog>
    </div>
  )
}

export default Children
