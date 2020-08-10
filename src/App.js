import React from 'react';
import './styles/main.scss';
import QueryRow from './components/QueryRow';
import SearchButton from './components/SearchButton';

function App() {
  return (
    <main className="App">
      <h1>Search for Sessions</h1>
      <div id="query-holder">
        <QueryRow/>
        <QueryRow/>
      </div>
      <button className="button">And</button>
      <footer>
        <SearchButton /> 
        <button className="button disabled">Reset</button>
      </footer>

    </main>
  );
}

export default App;
