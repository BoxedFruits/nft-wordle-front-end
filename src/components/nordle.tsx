import React from 'react';
import { ethers } from 'ethers';
import { contractAddress } from '../utils/constants';
import nordleAbi from '../utils/nordle.abi.json';

//Need to show error message if at max tries or already solved
//Disable input?
const Nordle = () => {
  const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  const nordleContract = new ethers.Contract(contractAddress, nordleAbi.abi, web3Provider.getSigner());
  
    return (<div>
      this is nordle
      <div>
        <button onClick={() => nordleContract.guessWord('LLLLLL')}>interaction or something</button>
      </div>
    </div>);
  
}

export default Nordle;
