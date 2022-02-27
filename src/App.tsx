import React from 'react';
import Header from './components/header';
import Nordle from './components/nordle';
import logo from './../logo.svg';
import './App.css';
import { useAppSelector } from './app/hooks';

function App() {
  const state = useAppSelector(state => state.addressReducer.address);
  return (
    <div className="App">
      <Header />
      <Nordle/>
    </div>
  );
}

export default App;
