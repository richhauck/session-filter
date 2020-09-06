import React, {useRef} from 'react';
import Selector from './Selector';
import CloseButton from './CloseButton';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';
import classNames from 'classnames';

function QueryRow(props){
    const textInput = useRef(null);
    const store = React.useContext(StoreContext);
    const myRowId = props['data-id'];

    const onSelect1ChangeHandler = (id) => {
        store.setPredicateId(myRowId, id);
    }
    const onSelect2ChangeHandler = (id) => {
        store.setOperatorId(myRowId, id);
    }
    const onCloseHandler = () => {
        store.removeQuery(myRowId);
    }
    const onInputChangeHandler = (event) => {
        store.setTextValue(myRowId, event.target.value);
    }
    const onNum1ChangeHandler = (event) => {
        store.setNum1Value(myRowId, event.target.value);
    }
    const onNum2ChangeHandler = (event) => {
        store.setNum2Value(myRowId, event.target.value);
    }
    return useObserver(() => (
        <div className="query-row">
            <CloseButton onClick={onCloseHandler} />

            {/* Predicate Selector - always display */}
            <Selector selectedId={store.getPredicateId(myRowId)} onChange={onSelect1ChangeHandler} options={store.predicateOptions}/>

            {/* Second Selector - only for string values */}
            {store.getPredicateType(myRowId) ==='string' && <Selector selectedId={store.getOperatorId(myRowId)} onChange={onSelect2ChangeHandler} options={store.stringOptions}/>}

            {/* "is" - displayed only for selector 1: 'number' and selector 2: is not 'equals' */}
            {store.getPredicateType(myRowId) ==='number' && store.getOperatorId(myRowId) !== 0 && <span>is</span>}

            {/* Second Selector - for integer */}
            {store.getPredicateType(myRowId) ==='number' && <Selector selectedId={store.getOperatorId(myRowId)}  onChange={onSelect2ChangeHandler} options={store.integerOptions}/>}

            {/* Text inputs displayed only for range of integer values */}
            {store.getPredicateType(myRowId) ==='number' && store.getOperatorId(myRowId) === 1 && <>
            <input type="text" onChange={onNum1ChangeHandler} required="required" className={classNames({'warning': (store.wasSearchCalled && store.getNum1Value(myRowId) === '')})} value={store.getNum1Value(myRowId)} placeholder="0"></input>
            <span>and</span>
            <input type="text" onChange={onNum2ChangeHandler} required="required" className={classNames({'warning': (store.wasSearchCalled && store.getNum2Value(myRowId) === 0)})} value={store.getNum2Value(myRowId)} placeholder="0"></input>
            </>}

            {/* Input Text */}
            {!(store.getPredicateType(myRowId) === 'number' && store.getOperatorId(myRowId) === 1) && <input type="text" ref={textInput} onChange={onInputChangeHandler} required="required" className={classNames({'warning': (store.wasSearchCalled && store.getTextValue(myRowId) === '')})} value={store.getTextValue(myRowId)} placeholder={store.getPlaceholder(myRowId)}></input>}


        </div>))
}
export default QueryRow;