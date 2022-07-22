import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Button, Stack } from '@mui/material';
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
import {NavLink} from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

const ChildCard = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDialog = async (element) => {
    if (window.confirm("Çyndanam pozmak isleýäňizmi?")) {
    }
  };

  return (
    <Card sx={{ width: '100%'}} key={props.index}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.item.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.item.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <NavLink to={"/childview/"+props.index}><IconButton color="secondary"><InfoIcon/></IconButton></NavLink>
        <IconButton color="warning" onClick={handleClickOpen}><EditIcon/></IconButton>
        <IconButton color="error" onClick={confirmDialog}><DeleteIcon/></IconButton>
        
      </CardActions>
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
              Çaga üýtgetmek
            </Typography>

            <Button color={'inherit'} sx={{mr:1}} startIcon={<DownloadIcon/>}>QR code</Button>
            

            <Button autoFocus variant={'outlined'} onClick={handleClose}>
              Üýtget
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
              <FileBrowse component="span" image={'Çaga suraty'} src={'/images/child.webp'}>
              </FileBrowse>
          </label>
        </Grid>

        <Grid item lg={3}>
          <label htmlFor="contained-button-file2">
              <Input id="contained-button-file2" type="file" />
              <FileBrowse component="span" image={'Dogluş hakynda şahadatnama'}>
              </FileBrowse>
          </label>
          <Button startIcon={<DownloadIcon/>} color="inherit">Ýükle</Button>
        </Grid>

        <Grid item lg={3}>
          <label htmlFor="contained-button-file3">
              <Input id="contained-button-file3" type="file" />
              <FileBrowse component="span" image={'Üç arka maglumaty'}>
              </FileBrowse>
          </label>
          <Button startIcon={<DownloadIcon/>} color="inherit">Ýükle</Button>
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
    </Card>
  )
}

export default ChildCard
