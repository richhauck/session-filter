import React from 'react';
import './styles/main.scss';
import {QueryProvider, StoreContext} from './stores/QueryProvider';
import QueryRowList from './components/QueryRowList';
import SearchButton from './components/SearchButton';
import Output from './components/Output';

function App() {
  const store = React.useContext(StoreContext);
  const reset = () => {
    store.reset();
  }
  const onSearchHandler = (e) => {
    console.log('search');
  }
  return (
    <QueryProvider>
      <main className="App">
        <h1>Search for Sessions</h1>
        <QueryRowList />
        <footer>
          <SearchButton onClick={onSearchHandler} /> 
          <button className="button disabled" onClick={reset}>Reset</button>
        </footer>
        <Output/>
      </main>
    </QueryProvider>
  );
}

export default App;
