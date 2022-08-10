import React, {useState, useEffect} from 'react';
import PdfChild from "./PdfChild";

const PdfViewerChild = (props) => {
    return (
        <div>
            <PdfChild child={props.child} componentRef={props.componentRef}/>
        </div>
    )
}

export default PdfViewerChild;