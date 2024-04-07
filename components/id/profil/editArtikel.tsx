import React from 'react'
import EditArtikelFormLeft from './editArtikelFormLeft'
import EditArtikelFormRight from './editArtikelFormRight'

export default function EditArtikel() {
  return (
    <div className='flex flex-col '>
      <p className='text-4xl font-extrabold'>Edit Artikel</p>
      <form>
        <div className='flex flex-col md:flex-row mt-6 mb-16 gap-8'>
          <EditArtikelFormLeft/>
          <EditArtikelFormRight/>
        </div>
      </form>
    </div>
  )
}
