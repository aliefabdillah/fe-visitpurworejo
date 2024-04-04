import React from 'react'
import UlasanForm from './ulasanForm'
import UlasanList from './ulasanList'

export default function UlasanSection() {
  return (
    <div className='my-4'>
     <h1 className='text-4xl font-bold'>Ulasan (40)</h1>
     <UlasanForm/>
     <UlasanList/>
    </div>
  )
}
