import React from 'react';
import Header from './components/header';
import Nordle from './components/nordle';
import logo from './../logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Nordle/>
    </div>
  );
}

export default App;
