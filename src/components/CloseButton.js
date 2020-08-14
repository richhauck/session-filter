import React from 'react';
import closeIcon from '../images/close-24px.svg';

function CloseButton(props){
    const onClickHandler = (e) => {
        props.onClick(e);
    }
    return <button onClick={onClickHandler} className="closebutton"><img src={closeIcon} alt="Close"/></button>
}
export default CloseButton;