import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import { AxiosInstance } from "../../api/Axios/AxiosInstance";
import { showError, showSuccess, showWarning } from "../../alert/Alert.mjs";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Edit } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { LOGTYPE } from '../../common/constant.mjs';

const SettingsApp = (props) => {
    const [sms, setSms] = useState('');
    const [exitSMS, setExitSms] = useState('');
    const getByType = (type, list) => {
        return list.filter((item, i) => item.type == type)
    }
    const getSms = () => {
        AxiosInstance.get('/admin/get-sms')
            .then(response => {
                if (!response.data.error) {
                    setSms(getByType(LOGTYPE.ENTER, response.data.body)[0].sms);
                    setExitSms(getByType(LOGTYPE.EXIT, response.data.body)[0].sms);
                } else {
                    showWarning('Error');
                }
            })
            .catch(err => {
                showError(err);
            })
    }
    useEffect(() => {
        getSms();
    }, []);

    const updateSms = (type) => {
        if (sms == '' || sms == null) {
            showWarning('Maglumatlary girizin!');
            return;
        }
        AxiosInstance.put('/admin/update-sms', {
            sms: type == LOGTYPE.ENTER ? sms : exitSMS,
            type: type
        })
            .then(response => {
                if (!response.data.error) {
                    showSuccess('Üýtgedildi');
                } else {
                    showError('Error');
                }
            })
            .catch(err => {
                showError(err);
            })
    }

    const [ip,setIp]=useState(localStorage.getItem('localip'));
    const saveIp=()=>{
        localStorage.setItem('localip',ip);
    }

    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Giriş sms ýazgysy"
                multiline
                rows={4}
                value={sms}
                fullWidth={true}
                onChange={e => setSms(e.target.value)}
                helperText={'Çaganyň ady: _child_name, Hossarynyň ady: _parent_name, Senesi: _date, Wagty: _time'}
            />
            <Button startIcon={<Edit />} color={'warning'} onClick={() => updateSms(LOGTYPE.ENTER)} fullWidth={false} sx={{ float: 'right', mt: 2 }} variant={'contained'}>
                Üýtget
            </Button>

            <br/>
            <br/>
            <br/>
            <br/>


            <TextField
                id="outlined-multiline-static"
                label="Çykyş sms ýazgysy"
                multiline
                rows={4}
                value={exitSMS}
                fullWidth={true}
                onChange={e => setExitSms(e.target.value)}
                helperText={'Çaganyň ady: _child_name, Hossarynyň ady: _parent_name, Senesi: _date, Wagty: _time'}
            />
            <Button startIcon={<Edit />} color={'warning'} onClick={() => updateSms(LOGTYPE.EXIT)} fullWidth={false} sx={{ float: 'right', mt: 3 }} variant={'contained'}>
                Üýtget
            </Button>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <Stack>
            <TextField id="filled-basic" label="Local ip" variant="filled" value={ip} onChange={e=>setIp(e.target.value)}/>
            <br/>
            <Button startIcon={<Edit />} color={'warning'} onClick={() => saveIp()} fullWidth={false} variant={'contained'}>
                Üýtget
            </Button>
            </Stack>

            <ToastContainer />
        </div>
    )
}

export default SettingsApp;