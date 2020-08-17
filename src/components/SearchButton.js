import React from 'react';
import classNames from 'classnames';
import searchIcon from '../images/search-24px.svg';

function SearchButton(props){
    const classes = classNames('searchbutton', 'button');
    const onClickHandler = (e) => {
        if(props.onClick) props.onClick(e);
    }
    return <button onClick={onClickHandler} className={classes}><div><img src={searchIcon} alt="Search"/> <span>Search</span></div></button>
}
export default SearchButton;