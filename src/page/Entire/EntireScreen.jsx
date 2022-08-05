import React, { useEffect, useState } from 'react';
import '../../style/Entire/entire.css';
import { Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { IMAGE_ADDRESS, QR_CODE_LENGHT, SERVER_ADDRESS } from '../../common/constant.mjs';
import { AxiosInstance } from '../../api/Axios/AxiosInstance';
import { ToastContainer } from 'react-toastify';
import { showError, showSuccess, showWarning } from '../../alert/Alert.mjs';
import '../../font/font.ttf';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};


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
      return "Çykys hasaba alyndy";
    } else {
      return "Giris hasaba alyndy";
    }
  }
  const getRelative = (child) => {
    if (child.phone_number_gender == 1) {
      return child.father_fullname;
    } else {
      return child.mother_fullname;
    }
  }

  const [playing, toggle] = useAudio('../../audio/success.wav');

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
        toggle();
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
            <Typography variant={'h5'} color={'white'} sx={{ fontWeight: 'bold', ml: 2, fontFamily:'myFont',mt:2 }} className={'myFont'}>70 Çagalar<br />bagy</Typography>
          </Stack>
          <Stack direction={'row'}>
            <img src="/images/cloud.png" alt="cloud" className="cloud" />
            <div id="right-cyrcle">
              <center><div id="inside-cyrcle"></div></center>
            </div>

          </Stack>
        </Stack>
      </div>
      {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
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
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily:'myFont' }}>
            {child == null ? "ID kardynyzy ýakynlasdyryn" : getType(last_log)}
          </Typography>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '30px', fontFamily:'myFont' }}>
            {new_log == null ? "00:00" : new_log.time_log}
          </Typography>
          <input ref={inputRef} autoFocus type="text" value={idValue} onChange={e => setIdValue(e.target.value)} />

        </center>

        <Stack alignItems={'start'} sx={{ mt: 2 }} className={'centerItem'}>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '12px', fontFamily:'myFont' }}>
            Ady/Familyasy:
          </Typography>
          <div className="textBack">
            <Typography color="white" sx={{ fontWeight: 'bold', fontSize: '14px', ml: 2, fontFamily:'myFont' }}>
              {child == null ? "..." : `${child.name} ${child.surname}`}
            </Typography>
          </div>
        </Stack>

        <Stack alignItems={'start'} sx={{ mt: 2 }} className={'centerItem'}>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '12px', fontFamily:'myFont' }}>
            Topary:
          </Typography>
          <div className="textBack">
            <Typography color="white" sx={{ fontWeight: 'bold', fontSize: '14px', ml: 2, fontFamily:'myFont' }}>
              {child == null ? "..." : `${child.group_name}`}
            </Typography>
          </div>
        </Stack>

        <Stack alignItems={'start'} sx={{ mt: 2 }} className={'centerItem'}>
          <Typography color="#7467D0" sx={{ fontWeight: 'bold', fontSize: '12px', fontFamily:'myFont' }}>
            Hossary:
          </Typography>
          <div className="textBack">
            <Typography color="white" sx={{ fontWeight: 'bold', fontSize: '14px', ml: 2, fontFamily:'myFont' }}>
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
          <Typography color="white" sx={{fontFamily:'myFont'}}>
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
