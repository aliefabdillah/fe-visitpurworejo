import Footer from '@/components/footer'
import NavbarGreen from '@/components/navbarGreen'
import NavbarWhite from '@/components/navbarWhite'
import React from 'react'

export default function Homepage() {
  return (
    <div>
      <NavbarWhite/>
      {/* <div className='bg-red-500 h-screen'>Hello, Next.JS!</div> */}
      <div className='flex flex-col items-center w-full h-screen max-h-svh bg-slate-600'>
        <div className="w-8/12 bg-red-500">
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