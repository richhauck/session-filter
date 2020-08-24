import React from 'react';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';
import {CSSTransition} from 'react-transition-group';

function Output(){
    const store = React.useContext(StoreContext);
    return useObserver(() => (

        <CSSTransition
            timeout={700}
            classNames="fade"
        >
            <>{store.showOutput && <div id="output">{store.output}</div>}</>
        </CSSTransition>
        
        
        ));
}
export default Output;