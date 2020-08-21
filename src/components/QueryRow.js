import React, {useState, useEffect} from 'react';
import Selector from './Selector';
import CloseButton from './CloseButton';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';

function QueryRow(props){
    const store = React.useContext(StoreContext);
    const [predicateId, setPredicateId] = useState(0);
    const [operatorId, setOperatorId] = useState(0);
    const [predicateType, setPredicateType] = useState(store.predicateOptions[0].type);

    const onSelect1ChangeHandler = (id) => {
        //setPredicateId(id);
        store.setPredicateId(props['data-id'], id);
        //setPredicateType(store.predicateOptions[id].type);
    }
    const onSelect2ChangeHandler = (id) => {
        //setOperatorId(id);
        store.setOperatorId(props['data-id'], id);
    }
    const onCloseHandler = (e) => {
        store.removeQuery(props['data-id']);
    }
    return useObserver(() => (
        <div className="query-row">
            <CloseButton onClick={onCloseHandler} />        
            <Selector onChange={onSelect1ChangeHandler} options={store.predicateOptions}/>

            {predicateType==='string' && <><Selector onChange={onSelect2ChangeHandler} options={store.stringOptions}/>
            <input type="text" required placeholder={store.predicateOptions[predicateId].placeholder}></input></>}

            {predicateType==='integer' && <><span>is</span>
            <Selector onChange={onSelect2ChangeHandler} options={store.integerOptions}/>
            <input type="text" placeholder="0"></input>
            <span>and</span>
            <input type="text" placeholder="0"></input>
            </>}
        </div>))
}
export default QueryRow;