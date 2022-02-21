import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../configureStore';
import { updateAddress } from '../ducks/address';

// const store = createStore(AddressReducer);


function Header() {
  const dispatch: AppDispatch = useDispatch();
  function clicked() {
    console.log("CLICKED");
    dispatch({...updateAddress("my New address")});
  }
  const state = useAppSelector(state => state.addressReducer.address);
  console.log(state);

  return (<div>
    This is my header
    <button onClick={clicked}> Connect </button>
    <button onClick={() => {console.log(state)}}> get state</button>
  </div>);
}

export default Header;