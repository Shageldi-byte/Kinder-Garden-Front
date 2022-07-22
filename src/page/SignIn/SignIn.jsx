import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AxiosInstance } from '../../api/Axios/AxiosInstance';
import { showError, showWarning } from '../../alert/Alert.mjs';


const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body={
      username: data.get('username'),
      password: data.get('password'),
    };
    AxiosInstance.post('/login',body)
    .then(response =>{
      if(!response.data.error){
        localStorage.setItem('my_token', response.data.body.token);
        localStorage.setItem('user_id', response.data.body.id);
        localStorage.setItem('kinder_garden', response.data.body.kinder_garden_name);
        localStorage.setItem('user_role', response.data.body.user_role);
        if(response.data.body.user_role=='admin'){
          window.location.href="/";
        } else if(response.data.body.user_role=='logger'){
          window.location.href="/entire";
        }
      } else {
        showWarning('Ýalňyşlyk ýüze çykdy!');
      }
    })
    .catch(error=>{
      showError(error+'');
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Içeri girmek
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Ulanyjy ady"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Açar sözi"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ýatda saklat"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Içeri gir
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}