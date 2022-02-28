import React from 'react'

type Props = {
  value?: string
}

export const Cell = ({
  value,
}: Props) => {

  return (
    <div style={{ width: "5.75vw", height: "5.75vw" }} className='cell w-6 h-6 sm:w-10 sm:h-10 md:w-24 md:h-24  mx-1 md:mx-4 border-solid border-2 flex items-center justify-center text-4xl font-bold rounded dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600'>
      <div className="letter-container">
        {value}
      </div>
    </div>
  )
}
