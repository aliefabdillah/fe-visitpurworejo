import React from 'react'

export default function EmptyData({ halaman } : { halaman: string}) {
  return (
    <div className='mb-4'>
      <p className='text-center text-2xl font-medium text-stone-400'>{halaman} Tidak Ditemukan!</p>
    </div>
  )
}
