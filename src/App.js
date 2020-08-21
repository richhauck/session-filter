import React from 'react';
import './styles/main.scss';
import {StoreContext} from './stores/QueryProvider';
import QueryRowList from './components/QueryRowList';
import SearchButton from './components/SearchButton';
import Output from './components/Output';
import {useObserver} from 'mobx-react-lite';

function App() {
  const store = React.useContext(StoreContext);
  const reset = () => store.reset();
  const onSearchHandler = (e) => store.search()
  return useObserver(() => (
      <main className="App">
        <h1>Search for Sessions</h1>
        <QueryRowList />
        <footer>
          <SearchButton onClick={onSearchHandler} /> 
          <button disabled={!store.isChangedState} className="button" onClick={reset}>Reset</button>
        </footer>
        <Output/>
      </main>
    ));
}

export default App;
