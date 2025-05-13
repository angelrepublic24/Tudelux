'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation'; 


type Props = {
    title: string;
    description: string;
    image?: string;
    render?: string;
    url?: string;
    className?: string
}

export const ProductType = ({title, description, image, render, url, className}: Props) => {
      const pathname = usePathname(); 


  return (
    <Link href={`${pathname}/${url}`}>
      <div>
        <Image src={image?.startsWith('http') ? image : `/${image}`} alt={title} width={200} height={200} />
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </Link>
  )
}
