// import { MAX_CHALLENGES } from '../../constants/settings'
// import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import React from 'react';

type Props = {
  currentGuess: string
  // currentRowClassName: string
}

export const Grid = ({
  currentGuess// currentRowClassName,
}: Props) => {
  const empties = [];

  return (
    <div className="pb-6">
      <CurrentRow guess={currentGuess} 
      // className={currentRowClassName} 
      />
    </div>
  )
}
