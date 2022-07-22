import React, { useEffect, useState } from 'react';
import '../../style/Entire/entire.css';
import { Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { IMAGE_ADDRESS, QR_CODE_LENGHT, SERVER_ADDRESS } from '../../common/constant.mjs';
import { AxiosInstance } from '../../api/Axios/AxiosInstance';
import { ToastContainer } from 'react-toastify';
import { showError, showSuccess, showWarning } from '../../alert/Alert.mjs';


const EntireScreen = () => {
  const [child, setChild] = useState(null);
  const [last_log, setLastLog] = useState(null);
  const [new_log, setNewLog] = useState(null);
  const [idValue, setIdValue] = useState('');
  const inputRef = useRef();
  const getType = (log) => {
    if(typeof log === 'undefined' || log == null) {
      return "Giriş hasaba alyndy";
    } else if (log.log_type == 1) {
      return "Çykyş hasaba alyndy";
    } else {
      return "Giriş hasaba alyndy";
    }
  }
  const getRelative = (child) => {
    if (child.phone_number_gender == 1) {
      return child.father_fullname;
    } else {
      return child.mother_fullname;
    }
  }

  const getTypeValue = (log) => {
    if(typeof log === 'undefined' || log == null) {
      return 1;
    } else if (log.log_type == 1) {
      return 0;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (idValue.length === QR_CODE_LENGHT) {
      AxiosInstance.post('/log/get-child-by-qr-code', {
        qrCode: idValue
      })
        .then(response => {
          if (!response.data.error) {
            showSuccess('Hasaba alyndy!');
            setChild(response.data.body.child);
            setLastLog(response.data.body.last_log);
            setIdValue('');
            sendNewLog(response.data);
          } else {
            showWarning('Ýalňyşlyk ýüze çykdy');
          }
        })
        .catch(err => {
          showError(err + '');
        })
    }
  }, [idValue]);

  const sendNewLog=(data)=>{
    let type=getTypeValue(data.body.last_log);
    let newLog={
      type: type,
      child_id:data.body.child.id
    };
    AxiosInstance.post('/log/add-log',newLog)
    .then(response => {
      if (!response.data.error) {
        showSuccess('Hasaba alyndy!');
        setNewLog(response.data.body);
      } else {
        showWarning('Ýalňyşlyk ýüze çykdy');
      }
    })
    .catch(err => {
      showError(err + '');
    })
  }
  return (
    <div className={'main-section'} onClick={() => inputRef.current.focus()}>
      <ToastContainer />
      <div className='top-section'>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'row'}>
            <div id="top-cyrcle"></div>
            <Typography variant={'h5'} color={'white'} sx={{ fontWeight: 'bold', ml: 2 }}>70 Çagalar<br />bagy</Typography>
          </Stack>
          <Stack direction={'row'}>
            <img src="/images/cloud.png" alt="cloud" className="cloud" />
            <div id="right-cyrcle">
              <center><div id="inside-cyrcle"></div></center>
            </div>

          </Stack>
        </Stack>
      </div>

      <center>
        <Stack direction={'row'}>
          <img src="/images/plane.png" alt="left-plain" className="plain" />
          <img src={child == null ? "/images/empty_image.png" : `${IMAGE_ADDRESS}${child.child_image}`} alt="child" id="child-image" />
          <Stack direction={'column'}>
            <img src="/images/paper-plain.png" alt="paper" className="paper" />
            <img src="/images/plane.png" alt="right-plain" className="right-plain" />
          </Stack>
        </Stack>
      </center>

      <div id="center-section">
        <center>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            {child == null ? "ID kardyňyzy ýakynlaşdyryň" : getType(last_log)}
          </Typography>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
            {new_log == null ? "00:00" : new_log.time_log}
          </Typography>
          <input ref={inputRef} autoFocus type="text" value={idValue} onChange={e => setIdValue(e.target.value)} />

        </center>

        <Stack alignItems={'start'} sx={{ marginLeft: '40%', mt: 2 }}>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '12px' }}>
            Ady/Familyasy:
          </Typography>
          <div className="textBack">
            <Typography color="white" sx={{ fontWeight: 'bold', fontSize: '14px', ml: 2 }}>
              {child == null ? "..." : `${child.name} ${child.surname}`}
            </Typography>
          </div>
        </Stack>

        <Stack alignItems={'start'} sx={{ marginLeft: '40%', mt: 2 }}>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '12px' }}>
            Topary:
          </Typography>
          <div className="textBack">
            <Typography color="white" sx={{ fontWeight: 'bold', fontSize: '14px', ml: 2 }}>
              {child == null ? "..." : `${child.group_name}`}
            </Typography>
          </div>
        </Stack>

        <Stack alignItems={'start'} sx={{ marginLeft: '40%', mt: 2 }}>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '12px' }}>
            Hossary:
          </Typography>
          <div className="textBack">
            <Typography color="white" sx={{ fontWeight: 'bold', fontSize: '14px', ml: 2 }}>
              {child == null ? "..." : getRelative(child)}
            </Typography>
          </div>
        </Stack>



        <br />
        <br />
        <br />
        <br />
        <br />
        <br />



      </div>

      <div className="footer">
        <img src="/images/childs.png" alt="childs" id="childs" />
        <center>
          <Typography color="white">
            Sanly Geljek 2022
          </Typography>
        </center>
        <img src="/images/questions.png" alt="tree" id="tree" />
        <img src="/images/string.png" alt="string" id="string" />
      </div>
    </div>
  )
}

export default EntireScreen
