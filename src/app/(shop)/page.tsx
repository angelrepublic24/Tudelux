import { Banner } from '@/modules/home/components/Banner'
import AccoladesSection from '@/modules/home/components/modules/AccordalesSection'
import ArchitectsPortalSection from '@/modules/home/components/modules/ArchitecturalPortal'
import { EstimateBanner } from '@/modules/home/components/modules/CtaSection'
import HomeItem from '@/modules/home/components/modules/HomeItems'
import NotableAccounts from '@/modules/home/components/modules/NotableAccount'
import RecentProjects from '@/modules/home/components/modules/RecentProjects'
import React from 'react'

export default function HomePage () {
  return (
    <>
      <Banner />
      <HomeItem/>
      <ArchitectsPortalSection />
      <RecentProjects />
      <AccoladesSection/>
      <NotableAccounts />
      <EstimateBanner />
    </>
    
    // <div className='flex justify-center items-center h-screen space-x-8'>
        
    //     <Link href={'/request-quote'} className='font-semibold'>Request Quote</Link>
    //     <Link href={'/canopy'} className='font-semibold'>Custom Canopy</Link>
    //     <Link href={'/custom-shape'} className='font-semibold'>Custom Shape</Link>
    // </div>
  )
}
