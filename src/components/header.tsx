import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../configureStore';

import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from "ethers";
import './header.css';
import { updateAddress } from '../ducks/address';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';

//TODO: Check that user is on rinkbey
function OnboardingButton() {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef<MetaMaskOnboarding>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(accounts[0]);
        setDisabled(true);
        onboarding.current.stopOnboarding();
        dispatch({...updateAddress(accounts[0])});
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <button className="connect-metamask" disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}

//Need to add web3 stuff
//ABI
//ContractAddress
function Header() {
  const state = useAppSelector(state => state.addressReducer.address);

  return (<div>
    This is my header
    <button onClick={() => {console.log(state)}}> get state</button>
    <OnboardingButton></OnboardingButton>
  </div>);
}

export default Header;