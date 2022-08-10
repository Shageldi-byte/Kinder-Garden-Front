import React, {useEffect, useState, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Button, Avatar, Grid, Typography, Stack} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {deepOrange} from '@mui/material/colors';
import ArticleIcon from '@mui/icons-material/Article';
import BadgeIcon from '@mui/icons-material/Badge';
import PrintIcon from '@mui/icons-material/Print';
import {AxiosInstance} from "../../api/Axios/AxiosInstance";
import {showError, showWarning} from "../../alert/Alert.mjs";
import {GENDER, SERVER_ADDRESS} from "../../common/constant.mjs";
import ReactToPrint from "react-to-print";
import {useTheme} from '@mui/styles';
import App from "../../App";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import PdfViewerChild from "../../component/child/PdfViewerChild";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ChildView = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const componentRef = useRef();

    const [child, setChild] = useState('');

    const getData = async () => {
        await AxiosInstance.get('/admin/get-single-child?child_id=' + id)
            .then((response) => {
                if (!response.data.error) {
                    setChild(response.data.body);
                } else {
                    showWarning('Error');
                }
            })
            .catch(err => {
                showError(err);
            })
    };

    useEffect(() => {
        getData();
    }, []);

    function getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const getPageStyle = () => {
        console.log(App());
        const isDarkTheme = App().props.theme.palette.mode === 'dark';
        if (isDarkTheme) {
            return '@page { size: auto; margin: 0mm; background:white !important; color: black !important; } ' +
                '@media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; ' +
                'background:white !important; color: black !important;} }';
        } else {
            return 'print';
        }
    }

    const certificateGo = () => {
        window.location.href = `${SERVER_ADDRESS}/${child.born_certificate_file}`;
    }

    const docsGo = () => {
        window.location.href = `${SERVER_ADDRESS}/${child.doc_file}`;
    }
    const healthGo = () => {
        window.location.href = `${SERVER_ADDRESS}/${child.health_doc}`;
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Button startIcon={<ArrowBackIcon/>} onClick={() => navigate(-1)}>Yza</Button>
                <Button color={'secondary'} startIcon={<PrintIcon/>} onClick={handleClickOpen}>Çap etmek</Button>

            </Stack>
            <Grid container sx={{padding: '22px'}} direction={{xs: 'column', md: 'column', lg: 'row'}} spacing={2}
                  >
                <Grid item lg={4}>
                    {/* <center> */}
                    <Avatar
                        sx={{bgcolor: deepOrange[500], width: '200px', height: '200px'}}
                        alt="Remy Sharp"
                        src={child != '' ? `${SERVER_ADDRESS}/public/image/children/${child.child_image}` : ''}
                    >
                        B
                    </Avatar>
                    <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Doly
                            ady:</Typography>{child != '' ? `${child.name} ${child.surname} ${child.middle_name}` : 'Ýüklenýär...'}
                    </Typography>

                    <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography
                            variant={'subtitle2'}>Topary:</Typography>{child != '' ? child.group_name : 'Ýüklenýär...'}
                    </Typography>

                    <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography
                            variant={'subtitle2'}>Ýaşy:</Typography>{child != '' ? getAge(child.dob) : 'Ýüklenýär...'}
                    </Typography>


                    <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                        <Typography variant={'subtitle2'}>Doglan
                            güni:</Typography>{child != '' ? `${new Date(child.dob).getFullYear()}-${new Date(child.dob).getMonth() + 1}-${new Date(child.dob).getDate()}` : 'Ýüklenýär...'}
                    </Typography>

                    {/* </center> */}
                </Grid>
                <Grid item lg={8}>
                    <Grid container direction={{xs: 'column', md: 'column', lg: 'row'}} spacing={2}>
                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Kakasynyň
                                    ady:</Typography>{child != '' ? child.father_fullname : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Kakasynyň telefon
                                    belgisi:</Typography>{child != '' ? child.father_phone_number : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Kakasynyň işleýän
                                    ýeri:</Typography>{child != '' ? child.father_job_address : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Ejesiniň
                                    ady:</Typography>{child != '' ? child.mother_fullname : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Ejesiniň telefon
                                    belgisi:</Typography>{child != '' ? child.mother_phone_number : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Ejesiniň işleýän
                                    ýeri:</Typography>{child != '' ? child.mother_job_address : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>


                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography
                                    variant={'subtitle2'}>Enekesi:</Typography>{child != '' ? child.child_caregiver : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>


                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Enekesiniň telefon
                                    belgisi:</Typography>{child != '' ? child.caregiver_phone_number : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Çagalar bagyna kabul edilen
                                    senesi:</Typography>{child != '' ? child.kinder_garden_entered_date : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Çagalar bagyny tamamlaýan
                                    senesi:</Typography>{child != '' ? child.kinder_garden_exited_date : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography
                                    variant={'subtitle2'}>Jynsy:</Typography>{child != '' ? child.gender == GENDER.MAN ? 'Erkek' : 'Zenan' : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Ýaşaýan
                                    salgysy:</Typography>{child != '' ? child.address : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Typography sx={{mt: 2}} className="infoTitle" variant={'subtitle1'}>
                                <Typography variant={'subtitle2'}>Doly
                                    maglumaty:</Typography>{child != '' ? child.full_information : 'Ýüklenýär...'}
                            </Typography>
                        </Grid>

                        <Grid item lg={4}>
                            <Button onClick={certificateGo} startIcon={<ArticleIcon/>}>Üç arkasy</Button>
                        </Grid>

                        <Grid item lg={4}>
                            <Button onClick={docsGo} startIcon={<BadgeIcon/>}>Şahadatnama</Button>
                        </Grid>

                        <Grid item lg={4}>
                            <Button onClick={healthGo} startIcon={<BadgeIcon/>}>Saglyk kepilnamasy</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Maglumaty
                        </Typography>
                        <ReactToPrint
                            trigger={() => {
                                return <Button color={'secondary'} startIcon={<PrintIcon/>} color={'inherit'} onClick={() => {
                                }}>Çap et</Button>
                            }}
                            content={() => componentRef.current}
                            documentTitle='new document'
                            pageStyle={getPageStyle()}
                        />
                    </Toolbar>
                </AppBar>
                <div>
                    <PdfViewerChild child={child} componentRef={componentRef}/>
                </div>
            </Dialog>
        </div>
    )
}

export default ChildView
