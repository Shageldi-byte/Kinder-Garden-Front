import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import {Button, Stack} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FileBrowse from '../../component/filebrowse/FileBrowse';
import {styled} from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import {NavLink} from 'react-router-dom';
import {GENDER, SERVER_ADDRESS} from "../../common/constant.mjs";
import {AxiosInstance,AxiosInstanceFormData} from "../../api/Axios/AxiosInstance";
import {showError, showSuccess, showWarning} from "../../alert/Alert.mjs";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const ChildCard = (props) => {

    const [open, setOpen] = React.useState(false);
    const [groups, setGroups] = useState(props.groups);
    const [child,setChild] = useState(props.item);
    
    // Update child
    const [name, setName] = useState(child.name);
    const [surname, setSurname] = useState(child.surname);
    const [middle_name, setMiddleName] = useState(child.middle_name);
    const [age, setAge] = useState(child.age);
    const [child_group, setChildGroup] = useState(child.group_id);
    const [faa, setFaa] = useState(child.father_fullname);
    const [father_phone_number, setFatherPhoneNumber] = useState(child.father_phone_number);
    const [maa, setMaa] = useState(child.mother_fullname);
    const [mother_phone_number, setMotherPhoneNumber] = useState(child.mother_phone_number);
    const [sms_gender, setSmsGender] = useState(child.phone_number_gender);
    const [caregiver, setCareGiver] = useState(child.child_caregiver);
    const [caregiver_phone_number, setCaregiverPhoneNumber] = useState(child.caregiver_phone_number);
    const [address, setAddress] = useState(child.address);
    const [enter_date, setEnterDate] = useState(child.kinder_garden_entered_date);
    const [exit_date, setExitDate] = useState(child.kinder_garden_exited_date);
    const [birthday, setBirthday] = useState(child.dob);
    const [gender, setGender] = useState(child.gender);
    const [fullinformation, setFullinformation] = useState(child.full_information);
    const [father_job, setFatherJob] = useState(child.father_job_address);
    const [mother_job, setMotherJob] = useState(child.mother_job_address);
    const [image, setImage] = useState('');
    const [borthCertificate, setBirthCertificate] = useState('');
    const [docs, setDocs] = useState('');
    const [healthDoc, setHealthDoc] = useState('');
    const [qr_code, setQrCode] = useState(child.qr_code);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeChild = (child_id) => {
        AxiosInstance.delete('/admin/delete-child/'+child_id)
            .then(response=>{
                if(!response.data.error){
                    showSuccess('Pozuldy');
                    props.getData();
                } else {
                    showWarning('Ýalňyşlyk ýüze çykdy');
                }
            })
            .catch(err=>{
                showError(err+"");
            })
    }

    const confirmDialog = async (element) => {
        if (window.confirm("Çyndanam pozmak isleýäňizmi?")) {
            removeChild(element.id);
        }
    };

    const handleFileInput = (e) => {
        setImage(e.target.files[0]);
    }

    const handleDocsInput = (e) => {
        setDocs(e.target.files[0]);
    }

    const handleCertificateInput = (e) => {
        setBirthCertificate(e.target.files[0]);
    }

    const clearInput = () => {
        setName('');
        setSurname('');
        setMiddleName('');
        setAge('');
        setChildGroup('');
        setFaa('');
        setFatherPhoneNumber('+993');
        setMaa('');
        setMotherPhoneNumber('+993');
        setSmsGender('');
        setCareGiver('');
        setCaregiverPhoneNumber('+993');
        setAddress('');
        setEnterDate('');
        setExitDate('');
        setBirthday('');
        setGender('');
        setFullinformation('');
        setFatherJob('');
        setMotherJob('');
        setImage('');
        setBirthCertificate('');
        setDocs('');
        setQrCode(makeid(20));
    }

    const addChildFun = () => {
        if (name == '' || surname == '' || child_group == '' || gender == '') {
            showWarning('Gerekli maglumatlary girizin!');
        } else {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('middlename', middle_name);
            formData.append('group_id', child_group);
            formData.append('faa', faa);
            formData.append('father_phone_number', father_phone_number);
            formData.append('father_work_address', father_job);
            formData.append('maa', maa);
            formData.append('mother_phone_number', mother_phone_number);
            formData.append('mother_work_address', mother_job);
            formData.append('phone_number_gender', sms_gender);
            formData.append('caregiver', caregiver);
            formData.append('caregiver_phone_number', caregiver_phone_number);
            formData.append('enter_date', enter_date);
            formData.append('exit_date', exit_date);
            formData.append('fullinformation', fullinformation);
            formData.append('gender', gender);
            formData.append('dob', birthday);
            formData.append('address', address);
            formData.append('qr_code', qr_code);
            formData.append('id', child.id);

            if(image!='' && image!=null) {
                formData.append('image', image);
            }

            if(docs!='' && docs!=null) {
                formData.append('docs', docs);
            }

            if(borthCertificate!='' && borthCertificate!=null) {
                formData.append('certificate', borthCertificate);
            }
            
            AxiosInstanceFormData.post('/admin/edit-child', formData)
                .then(response => {
                    if (!response.data.error) {
                        showSuccess('Üstünlikli üýtgedildi!');
                        clearInput();
                        props.getData();
                    } else {
                        showError('Ýalňyşlyk ýüze çykdy!');
                    }
                })
                .catch(err => {
                    showError(err);
                })
        }
    }

    const handleDobChange = (newValue) => {
        let date = new Date(newValue);
        setBirthday(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        
    };

    const handleEnterChange = (newValue) => {
        let date = new Date(newValue);
        setEnterDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        
    };

    const handleExitChange = (newValue) => {
        let date = new Date(newValue);
        setExitDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        
    };

    const handleHealthInput = (e) => {
        setHealthDoc(e.target.files[0]);
    }

    const generateQrCode=()=>{
        alert(qr_code);
    }



    return (
        <Card sx={{width: '100%'}} key={props.index}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${SERVER_ADDRESS}/public/image/children/${props.item.child_image}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${props.item.name} ${props.item.surname} ${props.item.middle_name}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Hossary: ${props.item.phone_number_gender == GENDER.MAN ? props.item.father_fullname : props.item.mother_fullname}`}
                        <br/>
                        {`Topary: ${props.item.group_name}`}
                        <br/>
                        {`Enekesi: ${props.item.child_caregiver}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink to={"/childview/" + props.item.id}><IconButton
                    color="secondary"><InfoIcon/></IconButton></NavLink>
                <IconButton color="warning" onClick={handleClickOpen}><EditIcon/></IconButton>
                <IconButton color="error" onClick={()=>confirmDialog(props.item)}><DeleteIcon/></IconButton>

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

                        <Button color={'inherit'} sx={{ mr: 1 }} onClick={generateQrCode} startIcon={<DownloadIcon />}>QR code</Button>

                        <Button autoFocus color={'warning'} variant={'outlined'} onClick={addChildFun}>
                            Üýtget
                        </Button>
                    </Toolbar>
                </AppBar>

                <Grid container direction={{ xs: 'column', md: 'column', lg: 'row' }} spacing={2} sx={{ padding: '22px' }}>

                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Ady" variant="filled"
                            value={name} onChange={e => setName(e.target.value)} />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Familiýasy" variant="filled"
                            value={surname} onChange={e => setSurname(e.target.value)} />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Atasynyň ady" variant="filled"
                            value={middle_name} onChange={e => setMiddleName(e.target.value)} />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Ýaşy" type='number' variant="filled"
                            value={age} onChange={e => setAge(e.target.value)} />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="filled-select-currency"
                            select
                            fullWidth
                            label="Topary"
                            variant="filled"
                            value={child_group}
                            onChange={e => setChildGroup(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Hiçisi</em>
                            </MenuItem>
                            {
                                groups.map((item, index) => {
                                    return (
                                        <MenuItem value={item.id} key={`group_key_${index}`}>{item.group_name}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Grid>

                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Kakasynyň doly ady" variant="filled"
                            value={faa} onChange={e => setFaa(e.target.value)} />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Kakasynyň telefon belgisi" variant="filled"
                            value={father_phone_number} onChange={e => setFatherPhoneNumber(e.target.value)} />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Ejesiniň doly ady" variant="filled"
                            value={maa} onChange={e => setMaa(e.target.value)} />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Ejesiniň telefon belgisi" variant="filled"
                            value={mother_phone_number} onChange={e => setMotherPhoneNumber(e.target.value)} />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField
                            id="filled-select-currency"
                            select
                            fullWidth
                            label="Sms ugratmaly telefon belgisi"
                            variant="filled"
                            value={sms_gender} onChange={e => setSmsGender(e.target.value)}
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
                        <TextField id="filled-basic" fullWidth label="Enekesiniň doly ady" variant="filled"
                            value={caregiver} onChange={e => setCareGiver(e.target.value)} />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField id="filled-basic" fullWidth label="Enekesiniň telefon belgisi" variant="filled"
                            value={caregiver_phone_number} onChange={e => setCaregiverPhoneNumber(e.target.value)} />
                    </Grid>

                    <Grid item lg={3}>
                        <label htmlFor="contained-button-file1">
                            <Input accept="image/*" id="contained-button-file1" type="file" onChange={handleFileInput} />
                            <FileBrowse component="span" image={image == '' ? 'Çaga suraty' : image.name}>
                            </FileBrowse>
                        </label>
                    </Grid>

                    <Grid item lg={3}>
                        <label htmlFor="contained-button-file2">
                            <Input id="contained-button-file2" type="file" onChange={handleCertificateInput} />
                            <FileBrowse component="span" image={borthCertificate == '' ? 'Dogluş hakynda şahadatnama' : borthCertificate.name}>
                            </FileBrowse>
                        </label>
                    </Grid>

                    <Grid item lg={3}>
                        <label htmlFor="contained-button-file3">
                            <Input id="contained-button-file3" type="file" onChange={handleDocsInput} />
                            <FileBrowse component="span" image={docs == '' ? 'Üç arka maglumaty' : docs.name}>
                            </FileBrowse>
                        </label>
                    </Grid>

                    <Grid item lg={3}>
                        <label htmlFor="contained-button-file3">
                            <Input id="contained-button-file3" type="file" onChange={handleHealthInput} />
                            <FileBrowse component="span" image={healthDoc == '' ? 'Saglyk ýagdaýy barada kepilnama' : healthDoc.name}>
                            </FileBrowse>
                        </label>
                    </Grid>

                    <Grid item lg={3}>
                        <TextField
                            id="filled-select-currency"
                            select
                            fullWidth
                            label="Jynsy"
                            variant="filled"
                            value={gender} onChange={e => setGender(e.target.value)}
                        >
                            <MenuItem key={'key4'} value={'1'}>
                                Erkek
                            </MenuItem>
                            <MenuItem key={'key5'} value={'2'}>
                                Aýal
                            </MenuItem>
                        </TextField>
                    </Grid>

                  
                    <Grid item lg={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                sx={{ minWidth: '100%' }}
                                label="Çagalar bagyna gelen wagty"
                                inputFormat="yyyy-MM-dd"
                                value={enter_date}
                                onChange={handleEnterChange}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item lg={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                fullWidth
                                sx={{ width: '100%' }}
                                label="Çagalar bagyndan gitmeli wagty"
                                inputFormat="yyyy-MM-dd"
                                onChange={handleExitChange}
                                value={exit_date} 
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item lg={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                sx={{ minWidth: '100%' }}
                                label="Doglan güni"
                                inputFormat="yyyy-MM-dd"
                                value={birthday} 
                                onChange={handleDobChange}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
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
                            value={address} onChange={e => setAddress(e.target.value)}
                        />
                    </Grid>


                    <Grid item lg={3}>
                        <TextField
                            fullWidth
                            id="filled-textarea"
                            label={'Doly maglumaty'}
                            placeholder={'Doly maglumaty...'}
                            multiline
                            rows={4}
                            variant="filled"
                            value={fullinformation} onChange={e => setFullinformation(e.target.value)}
                        />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField
                            fullWidth
                            id="filled-textarea"
                            label={'Kakasynyň iş ýeri'}
                            placeholder={'Kakasynyň iş ýeri...'}
                            multiline
                            rows={4}
                            variant="filled"
                            value={father_job} onChange={e => setFatherJob(e.target.value)}
                        />
                    </Grid>

                    <Grid item lg={3}>
                        <TextField
                            fullWidth
                            id="filled-textarea"
                            label={'Ejesiniň iş ýeri'}
                            placeholder={'Ejesiniň iş ýeri...'}
                            multiline
                            rows={4}
                            variant="filled"
                            value={mother_job} onChange={e => setMotherJob(e.target.value)}
                        />
                    </Grid>


                </Grid>
            </Dialog>
        </Card>
    )
}

export default ChildCard
