import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { contractAddress, MAX_WORD_LENGTH } from '../utils/constants';
import nordleAbi from '../utils/nordle.abi.json';
import { useAppSelector } from '../hooks';
import { Keyboard } from './keyboard/Keyboard';
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { Grid } from './grid/Grid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../configureStore';
import { setTransactionStatus } from '../ducks/transactionStatus';

//TODO: Need to show error message if at max tries or already solved
//Disable input?
const Nordle = () => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentToken, setCurrentToken] = useState<number>();
  const [currentTokenUri, setCurrentTokenUri] = useState<string>();

  const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  const nordleContract = new ethers.Contract(contractAddress, nordleAbi.abi, web3Provider.getSigner());
  const userWalletAddress = useAppSelector(state => state.addressReducer.address);
  const isTransactionPending = useAppSelector(state => state.transactionStatusReducers.transactionStatus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userWalletAddress !== '') {
      getCurrentToken();
    }
  }, [userWalletAddress])

  useEffect(() => {
    if (currentToken !== 0 && currentToken !== undefined && isTransactionPending !== true) {
      getCurrentTokenURI();
    }
  }, [currentToken, isTransactionPending])

  useEffect(() => {
    //show transaction modal thing
    console.log("TRANSACTION STATE", isTransactionPending)
  }, [isTransactionPending]);

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

  const onEnter = async () => {

    //TODO: Implement this in the future. check tries
    // if (isGameWon || isGameLost) {
    //   return
    // }

    // Implement something similar in the future
    // if (!(unicodeLength(currentGuess) === MAX_WORD_LENGTH)) {
    //   setCurrentRowClass('jiggle')
    //   return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
    //     onClose: clearCurrentRowClass,
    //   })
    // }
    if (currentGuess.length === MAX_WORD_LENGTH) {
      console.log("SUBMITTING", currentGuess);
      // ===TODO===
      //Show loading icon until the tx confirms
      //Clear input

      try {
        const tx = await nordleContract.guessWord(currentGuess);
        dispatch({ ...setTransactionStatus(true) })
        await tx.wait();
        dispatch({ ...setTransactionStatus(false) })
      } catch (e) {
        console.log("Error submitting the transaction:", e)
      }
    }
  }

  const getCurrentToken = async () => {
    try {
      setCurrentToken((await nordleContract.currentToken(userWalletAddress)).toNumber());
    } catch (e) {
      console.log("Error getting the token:", e);
    }
  }

  const getCurrentTokenURI = async () => {
    try {
      const tokenUri = await nordleContract.tokenURI(currentToken)
      setCurrentTokenUri(JSON.parse(atob(tokenUri.slice(tokenUri.indexOf(",") + 1))).image)
      console.log(tokenUri)
    } catch (e) {
      console.log("Error getting tokenURI from contract", e);
    }
  };

  return (
    <div>
      <div>
        <img src={currentTokenUri}></img>
        <div style={{ marginTop: "-40%" }}>
          <Grid currentGuess={currentGuess} />
          <Keyboard onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={"1"}
            isRevealing={isRevealing}></Keyboard>
        </div>
      </div>
    </div>);
}

export default Nordle;
