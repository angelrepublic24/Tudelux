import React from 'react'

interface ErrorMessageProp {
    children: React.ReactNode
}

export const ErrorMessage = ({children}: ErrorMessageProp) => {
  return (
    <p className='bg-red-50 text-red-700 p-3 text-sm font-bold text-center'>{children}</p>
  )
}
