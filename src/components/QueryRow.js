import React, {useState} from 'react';
import Selector from './Selector';
import CloseButton from './CloseButton';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';

function QueryRow(props){
    const store = React.useContext(StoreContext);
    const [predicateType, setPredicateType] = useState(store.predicateOptions[0].type);
    const onSelectChangeHandler = (id) => {
        setPredicateType(id, store.predicateOptions[id].type);
    }
    const onCloseHandler = (e) => {
        store.removeQuery(props['data-id']);
    }
    return useObserver(() => (
        <div className="query-row">
            <CloseButton onClick={onCloseHandler} />        
            <Selector onChange={onSelectChangeHandler} options={store.predicateOptions}/>

            {predicateType==='string' && <><Selector onChange={onSelectChangeHandler} options={store.stringOptions}/>
            <input type="text" required placeholder="website.com"></input></>}

            {predicateType==='integer' && <><span>is</span>
            <Selector onChange={onSelectChangeHandler} options={store.integerOptions}/>
            <input type="text" value="0"></input>
            <span>and</span>
            <input type="text" value="0"></input>
            </>}
        </div>))
}
export default QueryRow;