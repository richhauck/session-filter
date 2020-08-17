import React from 'react';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';

function Output(){
    const store = React.useContext(StoreContext);
    return useObserver(() => (<>{store.showOutput && <div id="output">{store.output}</div>}</>));
}
export default Output;