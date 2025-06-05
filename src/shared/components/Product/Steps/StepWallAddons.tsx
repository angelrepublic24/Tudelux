import { getWallAdOns } from '@/api/HubspotAPi'
import { StepTitle } from '@/components/ui/StepTitle/StepTitle'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export const StepWallAddons = () => {
    const {data: wallAdOns, isLoading, isError} = useQuery({
        queryFn: getWallAdOns,
        queryKey: ['wallAdOns']
    })

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading add-ons.</p>;
    console.log(wallAdOns);
  return (
    <section>
        <StepTitle step={6} title='Pick your Ad-Ons' />
        <Link href={'#'}>Read more</Link>

        
    </section>
  )
}
