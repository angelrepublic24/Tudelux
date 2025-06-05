import { titleFont } from '@/shared/config/fonts';
import React from 'react'

type Props = {
    title: string;
    subTitle?: string;
    className?: string;
}

export const Title = ({title, subTitle, className}: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
        <h1 className={` antialiased text-4xl font-semibold my-6 text-[#ff5100]`}>{title}</h1>
        {subTitle &&
        <h3 className='text-xl mb-10'>{subTitle}</h3>
        }
    </div>
  )
}
