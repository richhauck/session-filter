import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import chevron from '../images/expand_more-24px.svg';
/**
 * Customized select menu
*/
function Selector(props){
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const options = props.options;
    const [selectedValue, setSelected] = useState(options[0].label);
    

    const onClickHandler = () => {
        setIsOpen(!isOpen);
    }

    const onOptionsClickHandler = (e) => {
        setSelected(e.target.getAttribute('data-value'));
        // TODO: set styling on selected option
    }

    let classes = classNames('selector', {'open': isOpen});
    /**
     * Watch for clicks outside of options when open.
    */
    useEffect(() => {
        function handleClickOutside(event) {
            if(isOpen){
                if (wrapperRef.current && !wrapperRef.current.contains(event.target) && event.target.getAttribute('class') !== 'selector__trigger' && event.target.getAttribute('class') !== 'selected-value') {
                    setIsOpen(false);
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
    return (
        <div className="selector-wrapper" onClick={onClickHandler}>
        <div className={classes}>
            <div className="selector__trigger"><span className="selected-value">{selectedValue}</span>
                <div className="selector__icon"><img src={chevron} alt="Arrow" /></div>
            </div>
            <div ref={wrapperRef} className="selector-options" onClick={onOptionsClickHandler}>
                {options.map((option, id) => <span data-value={option.value} key={option.label + id}>{option.label}</span>)}
            </div>
        </div>
    </div>
    )
}
export default Selector;