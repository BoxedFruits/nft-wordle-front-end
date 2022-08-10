import { CurrentRow } from './CurrentRow'
import React from 'react';

type Props = {
  currentGuess: string
}

export const Grid = ({ currentGuess }: Props) => {

  return (
    <div className="pb-6">
      <CurrentRow guess={currentGuess} 
      // className={currentRowClassName} 
      />
    </div>
  )
}
