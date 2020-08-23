import React from 'react';
import {useObserver} from 'mobx-react-lite';
import {StoreContext} from '../stores/QueryProvider';
import QueryRow from './QueryRow';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

const QueryRowList = () => {
    const store = React.useContext(StoreContext);

    const addRow = () => {
      store.addQuery({});
    }
  
    return useObserver(() => (
      <TransitionGroup className="queryrowlist">

        {store.queries.map((query, id) => (
          <CSSTransition
              key={id}
              timeout={700}
              classNames="fade"
            >
          <QueryRow data-id={id} key={id}>{query}</QueryRow>
          </CSSTransition>
        ))}

        <button className="button" onClick={addRow}>And</button>
      </TransitionGroup>
      )
    )
  }
  export default QueryRowList;