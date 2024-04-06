import React from 'react'
import ChangePasswordForm from './changePasswordForm'

export default function ChangePassword() {
  return (
    <div className='flex flex-col gap-3 mb-4'>
      <p className='text-4xl font-extrabold'>Ubah Password</p>
      <ChangePasswordForm/>
    </div>
  )
}
