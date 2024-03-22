import React from 'react'

export default function AuthLayout(
  {children}:{children: React.ReactNode}
) {
  return (
    <div className='w-full h-dvh bg-gradient-to-b from-orange-100 to-white'>{children}</div>
  )
}
