import React from 'react';
import './styles/main.scss';
import QueryRow from './components/QueryRow';
import SearchButton from './components/SearchButton';
import Output from './components/Output';

function App() {
  const addRow = () => {
    console.log('add row');
  }
  const reset = () => {
    console.log('reset');
  }
  const onCloseHandler = (e) => {
    console.log('close', e);
  }
  const onSearchHandler = (e) => {
    console.log('search');
  }
  return (
    <main className="App">
      <h1>Search for Sessions</h1>
      <div id="query-holder">
        <QueryRow closeHandler={onCloseHandler} />
        <QueryRow closeHandler={onCloseHandler} />
      </div>
      <button className="button" onClick={addRow}>And</button>
      <footer>
        <SearchButton onClick={onSearchHandler} /> 
        <button className="button disabled" onClick={reset}>Reset</button>
      </footer>
      <Output/>
    </main>
  );
}

export default App;
