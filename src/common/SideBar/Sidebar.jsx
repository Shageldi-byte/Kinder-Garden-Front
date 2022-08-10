import AssessmentIcon from '@mui/icons-material/Assessment';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import React from 'react'
import {Settings} from "@mui/icons-material";
export const sideBarChilds = [
    {
        title:'Hasabat',
        icon: <AssessmentIcon/>,
        link:'/'
    },
    {
        title:'Çagalar',
        icon: <FamilyRestroomIcon/>,
        link:'/children'
    },
    {
        title:'Toparlar',
        icon: <GroupsIcon/>,
        link:'/group'
    },
    {
        title:'Taryh',
        icon: <HistoryToggleOffIcon/>,
        link:'/history'
    },
    {
        title:'Sazlamalar',
        icon: <Settings/>,
        link:'/settings'
    }
];
const Sidebar = () => {
  return (
    <div>
      
    </div>
  )
}

export default Sidebar
