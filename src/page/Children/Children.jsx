import React, { useEffect, useState } from 'react'
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
import { AxiosInstance, AxiosInstanceFormData } from "../../api/Axios/AxiosInstance";
import { showError, showSuccess, showWarning } from "../../alert/Alert.mjs";
import { ToastContainer } from "react-toastify";
import QrCodeApp from "../../component/child/QrCode";
import { useSearchParams } from "react-router-dom";


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


const Children = () => {

    const [filterAnchor, setFilterAnchor] = React.useState(null);
    const openFilter = Boolean(filterAnchor);
    const [open, setOpen] = React.useState(false);
    const [groups, setGroups] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    let group_id_param=searchParams.get("group_id");

    const [group, setGroup] = useState(group_id_param);
    const [month, setMonth] = useState(0);



    // Add child
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [middle_name, setMiddleName] = useState('');
    const [age, setAge] = useState(0);
    const [child_group, setChildGroup] = useState(0);
    const [faa, setFaa] = useState('');
    const [father_phone_number, setFatherPhoneNumber] = useState('+993');
    const [maa, setMaa] = useState('');
    const [mother_phone_number, setMotherPhoneNumber] = useState('+993');
    const [sms_gender, setSmsGender] = useState('');
    const [caregiver, setCareGiver] = useState('');
    const [caregiver_phone_number, setCaregiverPhoneNumber] = useState('+993');
    const [address, setAddress] = useState('');
    const [enter_date, setEnterDate] = useState('');
    const [exit_date, setExitDate] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState(1);
    const [fullinformation, setFullinformation] = useState('');
    const [father_job, setFatherJob] = useState('');
    const [mother_job, setMotherJob] = useState('');
    const [image, setImage] = useState('');
    const [borthCertificate, setBirthCertificate] = useState('');
    const [docs, setDocs] = useState('');
    const [healthDoc, setHealthDoc] = useState('');
    const [qr_code, setQrCode] = useState(makeid(20));





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


    const [list, setList] = useState([]);

    let months = [
        {
            id: '01',
            value: 'Ýanwar'
        },
        {
            id: '02',
            value: 'Fewral'
        },
        {
            id: '03',
            value: 'Mart'
        },
        {
            id: '04',
            value: 'Aprel'
        },
        {
            id: '05',
            value: 'Maý'
        },
        {
            id: '06',
            value: 'Iýun'
        },
        {
            id: '07',
            value: 'Iýul'
        },
        {
            id: '08',
            value: 'Awgust'
        },
        {
            id: '09',
            value: 'Sentýabr'
        },
        {
            id: "10",
            value: 'Oktýabr'
        },
        {
            id: '11',
            value: 'Noýabr'
        },
        {
            id: '12',
            value: 'Dekabr'
        }
    ];

    const getData = async () => {
        const body = {
            group: group,
            month: month
        };
        await AxiosInstance.post('/admin/get-children', body)
            .then(response => {
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
        getGroups();
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [group]);

    useEffect(() => {
        getData();
    }, [month]);

    const handleFileInput = (e) => {
        try{
            setImage(e.target.files[0]);
        } catch(err){
            console.log(err);
        }
    }

    const handleDocsInput = (e) => {
        try{
            setDocs(e.target.files[0]);
        } catch(err){
            console.log(err);
        }
       
    }

    const handleCertificateInput = (e) => {
        try{
            setBirthCertificate(e.target.files[0]);
        } catch(err){
            console.log(err);
        }
        
    }

    const handleHealthInput = (e) => {
        try{
            setHealthDoc(e.target.files[0]);
        } catch(err){
            console.log(err);
        }
        
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
        setHealthDoc('');
        setDocs('');
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
            formData.append('image', image);
            formData.append('docs', docs);
            formData.append('certificate', borthCertificate);
            formData.append('address', address);
            formData.append('qr_code', qr_code);
            formData.append('health_doc', healthDoc);
            AxiosInstanceFormData.post('/admin/add-child', formData)
                .then(response => {
                    if (!response.data.error) {
                        showSuccess('Üstünlikli goşuldy!');
                        clearInput();
                        getData();
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

    const generateQrCode=()=>{
        alert(qr_code);
    }


    return (
        <div>
            <Stack justifyContent='space-between' direction='row' sx={{ mb: 2 }}>
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
                        <Grid container spacing={2} sx={{ minWidth: '200px' }}>
                            <Grid item xs={12}>
                                <FormControl sx={{ mt: 3, width: '100%' }} size="small">
                                    <InputLabel id="demo-select-small">Topary</InputLabel>
                                    <Select
                                        fullWidth={true}
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={group}
                                        label="Topary"
                                        onChange={e => setGroup(e.target.value)}
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
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <FormControl sx={{ mt: 1, width: '100%' }} size="small">
                                    <InputLabel id="demo-select-small">Doglan aýy</InputLabel>
                                    <Select
                                        fullWidth={true}
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={month}
                                        label="Doglan aýy"
                                        onChange={e => setMonth(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Hiçisi</em>
                                        </MenuItem>
                                        {
                                            months.map((item, i) => {
                                                return (
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
                            <ChildCard item={element} index={i} getData={getData} groups={groups} />
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

                        <QrCodeApp value={qr_code}/>

                        <Button autoFocus color={'warning'} variant={'outlined'} onClick={addChildFun}>
                            Ýatda saklat
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
                        <label htmlFor="contained-button-file4">
                            <Input id="contained-button-file4" type="file" onChange={handleHealthInput} />
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
            <ToastContainer />
        </div>
    )
}

export default Children
