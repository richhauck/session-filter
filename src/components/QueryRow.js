import React from 'react';
import closeIcon from '../images/close-24px.svg';
import CloseButton from './CloseButton';

function QueryRow(){
    return (
        <div className="query-row">
            <CloseButton />
            <select>
                <option value="">User Email</option>
                <option value="">Screen Width</option>
                <option value="">Screen Height</option>
                <option value=""># of Visits</option>
                <option value="">First</option>
                <option value="">Name</option>
                <option value="">Last Name</option>
                <option value="">Page Response time (ms)</option>
                <option value="">Domain</option>
                <option value="">Page Path</option>
            </select>
            <select>
            <option value="">equals</option>
            <option value="">contains</option>
            <option value="">starts with</option>
            <option value="">in list</option>
            </select>

            <input type="text" placeholder="website.com"></input>

        </div>)
}
export default QueryRow;