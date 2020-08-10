import React from 'react';
import searchIcon from '../images/search-24px.svg';

function SearchButton(){
    return <button className="searchbutton"><img src={searchIcon} alt="Search"/> <span>Search</span></button>
}
export default SearchButton;