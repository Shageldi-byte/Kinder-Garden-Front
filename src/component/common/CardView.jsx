import React from 'react';
import '../../style/Common/card.view.css';

const CardView = (props) => {
    let className = typeof props.className !== 'undefined' ? props.className : '';
    return (
        <div className={`CardView ${className}`}>{props.children}</div>
    )
}

export default CardView
