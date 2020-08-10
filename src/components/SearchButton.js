import React from 'react';
import classNames from 'classnames';
import searchIcon from '../images/search-24px.svg';

function SearchButton(){
    const classes = classNames('searchbutton', 'button');
    return <button className={classes}><img src={searchIcon} alt="Search"/> <span>Search</span></button>
}
export default SearchButton;