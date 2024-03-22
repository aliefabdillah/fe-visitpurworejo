import Footer from '@/components/footer'
import NavbarGreen from '@/components/navbarGreen'
import NavbarWhite from '@/components/navbarWhite'
import React from 'react'

export default function Homepage() {
  return (
    <div>
      <NavbarWhite/>
      <div>Hello, Next.JS!</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <div className='w-full h-44 bg-slate-600'>TES</div>
      <Footer />
    </div>
  )
}