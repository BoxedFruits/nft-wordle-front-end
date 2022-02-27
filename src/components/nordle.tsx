import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { contractAddress, MAX_WORD_LENGTH } from '../utils/constants';
import nordleAbi from '../utils/nordle.abi.json';
import { useAppSelector } from '../hooks';
import { Keyboard } from './keyboard/Keyboard';
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { Grid } from './grid/Grid';
import { useStore } from 'react-redux';
import { RootState } from '../configureStore';

//TODO: Need to show error message if at max tries or already solved
//Disable input?
const Nordle = () => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentToken, setCurrentToken] = useState<BigNumber>();
  const [currentTokenUri, setCurrentTokenUri] = useState<string>();

  const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  const nordleContract = new ethers.Contract(contractAddress, nordleAbi.abi, web3Provider.getSigner());
  const userWalletAddress = useAppSelector(state => state.addressReducer.address);

  useEffect(() => {
    if (userWalletAddress !== '') {
      getCurrentToken();
    }
  }, [userWalletAddress])

  useEffect(() => {
    if (currentToken !== undefined) {
      getCurrentTokenURI();
    }
  }, [currentToken])

  const onChar = (value: string) => {
    if (currentGuess.length + 1 <= MAX_WORD_LENGTH) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    //Submit TX
    //Re-render the new tokenURI
  }

  const getCurrentToken = async () => {
    try {
      console.log(userWalletAddress)
      setCurrentToken(await nordleContract.currentToken(userWalletAddress));
    } catch (e) {
      console.log("Error getting the token:", e);
    }
  }

  const getCurrentTokenURI = async () => {
    try {
      const tokenUri = await nordleContract.tokenURI(currentToken.toNumber())
      setCurrentTokenUri(JSON.parse(atob(tokenUri.slice(tokenUri.indexOf(",") + 1))).image)
      console.log(tokenUri)
    } catch (e) {
      console.log("Error getting tokenURI from contract", e);
    }
  };

  return (
    <div>
      <div>
        <img style={{marginBottom: currentTokenUri !== undefined ? "-70rem": ""}} src={currentTokenUri}></img>
        <Grid currentGuess={currentGuess} />
        <button onClick={() => getCurrentToken()}>this is a test</button>
        <button onClick={() => getCurrentTokenURI()}>get tokenURI</button>
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
