import React from 'react';
import Selector from './Selector';
import CloseButton from './CloseButton';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';

function QueryRow(props){
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

            {/* displayed only for range of integer values */}
            {store.getPredicateType(myRowId) ==='number' && store.getOperatorId(myRowId) === 1 && <><input type="text" placeholder="0"></input><span>and</span><input type="text" placeholder="0"></input></>}

            {/* Input Text */}
            {!(store.getPredicateType(myRowId) === 'number' && store.getOperatorId(myRowId) === 1) && <input type="text" required="required" placeholder={store.getPlaceholder(myRowId)}></input>}


        </div>))
}
export default QueryRow;