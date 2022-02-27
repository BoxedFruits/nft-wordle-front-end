import React from 'react'

type Props = {
  value?: string
}

export const Cell = ({
  value,
}: Props) => {

  return (
    <div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600'>
      <div className="letter-container">
        {value}
      </div>
    </div>
  )
}
