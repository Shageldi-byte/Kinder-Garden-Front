import axios from 'axios';
import { SERVER_ADDRESS } from '../../common/constant.mjs';

const AxiosInstance = axios.create({
    baseURL: `${SERVER_ADDRESS}/api/`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('my_token')}`
    }
})

const AxiosInstanceFormData = axios.create({
    baseURL: `${SERVER_ADDRESS}/api/`,
    timeout: 100000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('my_token')}`,
        'Content-Type': 'multipart/form-data'
    }
})

export {AxiosInstance};
export {AxiosInstanceFormData};