import React from 'react'

export default function AccountSettings() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-4xl font-extrabold mb-4'>Pengaturan Akun</p>
      <div className='ml-10'>
        <button><p className='text-2xl text-error font-extrabold'>Non-aktifkan Akun</p></button>
        <p className='text-lg'>Lorem ipsum dolor sit amet consectetur. Auctor ullamcorper odio nullam mattis pharetra at malesuada enim.</p>
      </div>
      <div className='ml-10'>
        <button><p className='text-2xl text-error font-extrabold'>Hapus Akun</p></button>
        <p className='text-lg'>Lorem ipsum dolor sit amet consectetur. Auctor ullamcorper odio nullam mattis pharetra at malesuada enim.</p>
      </div>
    </div>
  )
}
