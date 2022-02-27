import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, MAX_WORD_LENGTH } from '../utils/constants';
import nordleAbi from '../utils/nordle.abi.json';
import { useAppSelector } from '../hooks';
import { Keyboard } from './keyboard/Keyboard';
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { Grid } from './grid/Grid';

//Need to show error message if at max tries or already solved
//Disable input?
const Nordle = () => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentToken, setCurrentToken] = useState();

  const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  const nordleContract = new ethers.Contract(contractAddress, nordleAbi.abi, web3Provider.getSigner());
  const userWalletAddress = useAppSelector(state => state.addressReducer.address);

  const onChar = (value: string) => {
    if ( currentGuess.length + 1 <= MAX_WORD_LENGTH ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    //Submit TX and check status
  }

  const getCurrentToken = async () => {
    try {
      //need to convert from bigNumber to int or something
      setCurrentToken(await nordleContract.currentToken(userWalletAddress));
      console.log(await nordleContract.currentToken(userWalletAddress));
    } catch (e) {
      console.log(e);
    }
  }


  //TODO: Retrive the NFT from etherscan
  //TODO: Send transaction when submit and update thing
  return (
    <div>
      <div>
        <Grid currentGuess={currentGuess} />
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
