import React from 'react';
import Selector from './Selector';
import CloseButton from './CloseButton';

const s1_Options = [
    {label:"User Email", value:"User Email"},
    {label:"Screen Width", value:"Screen Width"},
    {label:"Screen Height", value:"Screen Height"},
    {label:"# of Visits", value:"# of Visits"},
    {label:"First", value:"First"},
    {label:"Name", value:"Name"},
    {label:"Last Name", value:"Last Name"},
    {label:"Page Response time (ms)", value:"Page Response time (ms)"},
    {label:"Domain", value:"Domain"},
    {label:"Page Path", value:"Page Path"}
];
const s2_Options = [
    {label:'equals', value:'equals'}, 
    {label:'contains', value: 'contains'}, 
    {label:'starts with', value: 'starts with'}, 
    {label:'in list', value: 'in list'}
];

function QueryRow(props){
    const onCloseHandler = (e) => {
        props.closeHandler(e);
    }
    return (
        <div className="query-row">
            <CloseButton onClick={onCloseHandler} />        
            <Selector options={s1_Options}/>
            <Selector options={s2_Options}/>
            <input type="text" placeholder="website.com"></input>
        </div>)
}
export default QueryRow;