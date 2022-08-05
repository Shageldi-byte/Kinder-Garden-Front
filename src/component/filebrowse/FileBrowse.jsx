import { Typography } from '@material-ui/core'
import React from 'react'
import './filebrowser.css'
const FileBrowse = ({image,src}) => {
  return (
    <div className="file-browse">
        <center>
            <img src={typeof src === 'undefined'?'/images/browse.svg':src} className={typeof src === 'undefined'?"browse-icon":"child-image"}/><br/>
            <Typography variant="paragraph" sx={{width: '10px'}} className="browse-title">{image}</Typography>
        </center>
    </div>
  )
}

export default FileBrowse
