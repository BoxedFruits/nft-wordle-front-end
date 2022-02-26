import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress } from '../utils/constants';
import nordleAbi from '../utils/nordle.abi.json';
import { useAppSelector } from '../app/hooks';
import { Keyboard } from './keyboard/Keyboard';
import { default as GraphemeSplitter } from 'grapheme-splitter'

//Need to show error message if at max tries or already solved
//Disable input?
const Nordle = () => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const onChar = (value: string) => {
    setCurrentGuess(`${currentGuess}${value}`)
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    //Submit TX and check status
  }
  const [currentToken, setCurrentToken] = useState();
  const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  const nordleContract = new ethers.Contract(contractAddress, nordleAbi.abi, web3Provider.getSigner());
  const userWalletAddress = useAppSelector(state => state.addressReducer.address);

  const getCurrentToken = async () => {
    try {
      //need to convert from bigNumber to int or something
      setCurrentToken(await nordleContract.currentToken(userWalletAddress));
      console.log(await nordleContract.currentToken(userWalletAddress));
    } catch (e) {
      console.log(e);
    }
  }
  console.log(userWalletAddress)

  console.log(currentToken);
  // console.log(currentToken().then((r) => console.log(r)));

  //Retrive the NFT from etherscan
  //Input box
  //Show input dynamically
  return (
    <div>
      this is nordle
      <div>
        <button onClick={() => getCurrentToken()}>this is a test</button>
        <button onClick={() => nordleContract.guessWord('LLLLLL')}>interaction or something</button>
        <Keyboard onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={"1"}
          isRevealing={isRevealing}></Keyboard>
      </div>
    </div>);

}

export default Nordle;
