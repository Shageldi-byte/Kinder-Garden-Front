import React,{useState,useEffect} from 'react';
import QRCode from "react-qr-code";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DownloadIcon from "@mui/icons-material/Download";
import domtoimage from 'dom-to-image';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const QrCodeApp=(props)=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const downloadImage=()=>{
        domtoimage.toJpeg(document.getElementById('qr-code'), { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `${props.value}.jpeg`;
                link.href = dataUrl;
                link.click();
            });
    }
    return(
        <div>
            <Button color={'inherit'} sx={{ mr: 1 }} onClick={handleOpen} startIcon={<DownloadIcon />}>QR code</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <center>
                        <div style={{ background: 'white', padding: '16px' }} id={'qr-code'}>
                            <QRCode value={props.value}/>
                        </div>
                    </center>
                    <br/>
                    <Button startIcon={<DownloadIcon/>} onClick={downloadImage} fullWidth={true}>Ýükläp al</Button>
                </Box>
            </Modal>
        </div>

    )
}

export default QrCodeApp;