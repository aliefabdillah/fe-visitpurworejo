import Footer from '@/components/footer'
import HeroArtikel from '@/components/hero/hero-artikel'
import NavbarGreen from '@/components/navbarGreen'
import NavbarWhite from '@/components/navbarWhite'
import React from 'react'

export default function Homepage() {
  return (
    <div>
      <NavbarGreen/>
      <HeroArtikel/>
      <div className='flex flex-col items-center w-full h-screen max-h-svh bg-slate-600'>
        <div className="w-[40rem] lg:w-[60rem] xl:w-[80rem] 2xl:w-[100rem] bg-red-500">
          Tes
        </div>
      </div>
      {/* <div className='w-full h-screen bg-slate-600'>TES</div> */}
      {/* <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div> */}
      <Footer />
    </div>
  )
}