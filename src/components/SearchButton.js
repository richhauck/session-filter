import React from 'react';
import classNames from 'classnames';
import searchIcon from '../images/search-24px.svg';

function SearchButton(props){
    const onClickHandler = (e) => {
        props.onClick(e);
    }
    const classes = classNames('searchbutton', 'button');
    return <button onClick={onClickHandler} className={classes}><div><img src={searchIcon} alt="Search"/> <span>Search</span></div></button>
}
export default SearchButton;