import React from 'react';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';
import QueryRow from './QueryRow';

const QueryRowList = () => {
    const store = React.useContext(StoreContext);

    const addRow = () => {
      store.addQuery({});
    }
  
    return useObserver(() => (
      <div className="queryrowlist">
        {store.queries.map((query, id) => (
          <QueryRow data-id={id} key={id}>{query}</QueryRow>
        ))}

        <button className="button" onClick={addRow}>And</button>
      </div>
      )
    )
  }
  export default QueryRowList;