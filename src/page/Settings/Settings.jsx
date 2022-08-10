import React, {useState, useEffect} from 'react';
import TextField from "@mui/material/TextField";
import {AxiosInstance} from "../../api/Axios/AxiosInstance";
import {showError, showSuccess, showWarning} from "../../alert/Alert.mjs";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Edit} from "@mui/icons-material";
import {ToastContainer} from "react-toastify";

const SettingsApp = (props) => {
    const [sms,setSms]=useState('');
    const getSms=()=>{
        AxiosInstance.get('/admin/get-sms')
            .then(response=>{
                if(!response.data.error){
                    setSms(response.data.body.sms);
                } else {
                    showWarning('Error');
                }
            })
            .catch(err=>{
                showError(err);
            })
    }
    useEffect(()=>{
       getSms();
    },[]);

    const updateSms=()=>{
        if(sms=='' || sms==null){
            showWarning('Maglumatlary girizin!');
            return;
        }
        AxiosInstance.put('/admin/update-sms',{
            sms:sms
        })
            .then(response=>{
                if(!response.data.error){
                    showSuccess('Üýtgedildi');
                } else {
                    showError('Error');
                }
            })
            .catch(err=>{
                showError(err);
            })
    }
    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Sms ýazgysy"
                multiline
                rows={4}
                value={sms}
                fullWidth={true}
                onChange={e=>setSms(e.target.value)}
                helperText={'Çaganyň ady: _child_name, Hossarynyň ady: _parent_name, Senesi: _date, Wagty: _time'}
            />
            <Button startIcon={<Edit/>} color={'warning'} onClick={updateSms} fullWidth={false} sx={{float:'right',mt:2}} variant={'contained'}>
                Üýtget
            </Button>

            <ToastContainer/>
        </div>
    )
}

export default SettingsApp;