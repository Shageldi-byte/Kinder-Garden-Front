import './App.css';
import SideBar from './SideBar';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Report from './page/Report/Report';
import Children from './page/Children/Children';
import Group from './page/Group/Group';
import History from './page/History/History';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from "react";
import SignIn from './page/SignIn/SignIn';
import ChildView from './page/ChildView/ChildView';
import EntireScreen from './page/Entire/EntireScreen';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AB55',
      light:'#5BE584',
      lighter:'#C8FACD',
      dark:'#007B55',
      darker:'#005249'
    },
    secondary:{
      main: '#3366FF',
      light:'#84A9FF',
      lighter:'#D6E4FF',
      dark:'#1939B7',
      darker:'#091A7A'
    },
    info:{
      main: '#1890FF',
      light:'#74CAFF',
      lighter:'#D0F2FF',
      dark:'#0C53B7',
      darker:'#04297A'
    },
    success:{
      main: '#54D62C',
      light:'#AAF27F',
      lighter:'#E9FCD4',
      dark:'#229A16',
      darker:'#08660D'
    },
    warning:{
      main: '#FFC107',
      light:'#FFE16A',
      lighter:'#FFF7CD',
      dark:'#B78103',
      darker:'#7A4F01'
    },
    error:{
      main: '#FF4842',
      light:'#FFA48D',
      lighter:'#FFE7D9',
      dark:'#B72136',
      darker:'#7A0C2E'
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00AB55',
      light:'#5BE584',
      lighter:'#C8FACD',
      dark:'#007B55',
      darker:'#005249'
    },
    secondary:{
      main: '#3366FF',
      light:'#84A9FF',
      lighter:'#D6E4FF',
      dark:'#1939B7',
      darker:'#091A7A'
    },
    info:{
      main: '#1890FF',
      light:'#74CAFF',
      lighter:'#D0F2FF',
      dark:'#0C53B7',
      darker:'#04297A'
    },
    success:{
      main: '#54D62C',
      light:'#AAF27F',
      lighter:'#E9FCD4',
      dark:'#229A16',
      darker:'#08660D'
    },
    warning:{
      main: '#FFC107',
      light:'#FFE16A',
      lighter:'#FFF7CD',
      dark:'#B78103',
      darker:'#7A4F01'
    },
    error:{
      main: '#FF4842',
      light:'#FFA48D',
      lighter:'#FFE7D9',
      dark:'#B72136',
      darker:'#7A0C2E'
    }
  },
});

function App() {
  const [isDark,setIsDark] = useState(true);
  const changeMode =()=> {
    setIsDark(!isDark);
  };
  console.log=()=>{};
  console.error=()=>{};
  console.warning=()=>{};
  console.warn=()=>{};
  console.info=()=>{};

 

  

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/entire" element={<EntireScreen/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/" element={<SideBar changeMode={changeMode} isDark={isDark} />}>
            <Route index element={<Report />} />
            <Route path="children" element={<Children />} />
            <Route path="group" element={<Group/>} />
            <Route path="history" element={<History/>} />
            <Route path="childview/:id" element={<ChildView/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

