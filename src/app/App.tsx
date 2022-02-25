import React from 'react';
import Header from '../components/header';
import Nordle from '../components/nordle';
import logo from './../logo.svg';
import './App.css';
import { useAppSelector } from './hooks';

function App() {
  const state = useAppSelector(state => state.addressReducer.address);
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Nordle/>
      </header>
    </div>
  );
}

export default App;
