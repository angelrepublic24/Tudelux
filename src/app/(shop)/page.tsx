import Link from 'next/link'
import React from 'react'

export default function HomePage () {
  return (
    <div className='flex justify-center items-center h-screen space-x-8'>
        
        <Link href={'/request-quote'} className='font-semibold'>Request Quote</Link>
        <Link href={'/canopy'} className='font-semibold'>Custom Canopy</Link>
    </div>
  )
}
