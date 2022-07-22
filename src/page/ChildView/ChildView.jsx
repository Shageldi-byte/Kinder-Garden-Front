import React from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {Button,Avatar,Grid,Typography,Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deepOrange } from '@mui/material/colors';
import ArticleIcon from '@mui/icons-material/Article';
import BadgeIcon from '@mui/icons-material/Badge';
import PrintIcon from '@mui/icons-material/Print';


const ChildView = (props) => {
  const {id}=useParams();
  const navigate = useNavigate();
  return (
    <div>
    <Stack direction={'row'} justifyContent={'space-between'}>
        <Button startIcon={<ArrowBackIcon/>} onClick={()=>navigate(-1)}>Yza</Button>
        <Button color={'secondary'} startIcon={<PrintIcon/>} onClick={()=>{}}>Çap etmek</Button>
    </Stack>
    <Grid container sx={{padding:'22px'}} direction={{ xs:'column',md: 'column', lg: 'row' }} spacing={2}>
        <Grid item lg={4}>
            {/* <center> */}
            <Avatar
                sx={{ bgcolor: deepOrange[500],width:'200px',height:'200px'}}
                alt="Remy Sharp"
                src="/images/child.webp"
                >
                B
            </Avatar>
            <Typography sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                <Typography variant={'subtitle2'}>Doly ady:</Typography>Shageldi Alyyew Nazarowic
            </Typography>

            <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                <Typography variant={'subtitle2'}>Topary:</Typography>Alemgoshar
            </Typography>

            <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                <Typography variant={'subtitle2'}>Ýaşy:</Typography>4 ýaş
            </Typography>

            
            <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                <Typography variant={'subtitle2'}>Doglan güni:</Typography>12.12.2022
            </Typography>
            
            {/* </center> */}
        </Grid>
        <Grid item lg={8}>
            <Grid container  direction={{ xs:'column',md: 'column', lg: 'row' }} spacing={2}>
                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Kakasynyň ady:</Typography>Alyýew Nazar
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Kakasynyň telefon belgisi:</Typography>+99362737222
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Kakasynyň işleýän ýeri:</Typography>Pensioner
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Ejesiniň ady:</Typography>Ilmyradow Jumagül
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Ejesiniň telefon belgisi:</Typography>+99362737222
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Ejesiniň işleýän ýeri:</Typography>Pensioner
                    </Typography>
                </Grid>

                
                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Enekesi:</Typography>Maral Soltanowa
                    </Typography>
                </Grid>

                
                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Enekesiniň telefon belgisi:</Typography>+99362272482
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Çagalar bagyna kabul edilen senesi:</Typography>12.12.2022
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Çagalar bagyny tamamlaýan senesi:</Typography>12.12.2026
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Jynsy:</Typography>Erkek
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Ýaşaýan salgysy:</Typography>Aşgabat, Koshi
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Typography  sx={{mt:2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Doly maglumaty:</Typography>Lorem ipsum
                    </Typography>
                </Grid>

                <Grid item lg={4}>
                    <Button startIcon={<ArticleIcon/>}>Üç arkasy</Button>
                </Grid>

                <Grid item lg={4}>
                    <Button startIcon={<BadgeIcon/>}>Şahadatnama</Button>
                </Grid>

            </Grid>
        </Grid>
    </Grid>
    </div>
  )
}

export default ChildView
