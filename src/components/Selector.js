import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import chevron from '../images/expand_more-24px.svg';
/**
 * Customized select menu
*/
function Selector(props){
    const wrapperRef = useRef(null);
    const options = props.options;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    /**
     * Toggles isOpen value which determines if dropdown displays.
     */
    const onClickHandler = () => {
        setIsOpen(!isOpen);
    }
    /**
     * Sets selected id and propagates to parent if props function is passed.
    */
    const onOptionsClickHandler = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        setSelectedId(id);
        if(props.onChange){
            props.onChange(id);
        }
    }

    let classes = classNames('selector', {'open': isOpen});

    useEffect(() => {
        /**
         * Watch for clicks outside of options when open.
        */
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
    }, [isOpen, selectedId]);

    useEffect(() => {
        if(props.selectedId){
            if(selectedId !== props.selectedId){
                setSelectedId(props.selectedId);
            }
        }else{
            setSelectedId(0);
        }
    }, [props, selectedId]);


    return (
        <div className="selector-wrapper" onClick={onClickHandler}>
        <div className={classes}>
            <div className="selector__trigger"><span className="selected-value">{options[selectedId].label}</span>
                <div className="selector__icon"><img src={chevron} alt="Arrow" /></div>
            </div>
            <div ref={wrapperRef} className="selector-options" onClick={onOptionsClickHandler}>
                {options.map((option, id) => <span className={selectedId===id ? 'active' : ''} data-value={option.value} data-id={id} key={option.label + id}>{option.label}</span>)}
            </div>
        </div>
    </div>
    )
}
export default Selector;