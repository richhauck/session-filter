import React from 'react';
import closeIcon from '../images/close-24px.svg';

function CloseButton(){
    return <button className="closebutton"><img src={closeIcon} alt="Close"/></button>
}
export default CloseButton;