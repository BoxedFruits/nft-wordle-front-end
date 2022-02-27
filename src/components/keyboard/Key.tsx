/*
Much of the component code was borrowed from the react-wordle project
CREDIT TO: https://github.com/cwackerfuss/react-wordle
*/
import React, { ReactNode } from 'react'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../utils/constants';

type Props = {
  children?: ReactNode
  value: string
  width?: number
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  width = 40,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '58px',
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button className="flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400" 
      style={styles} onClick={handleClick}>
      {children || value}
    </button>
  )
}
