import ForgotPasswordForm from '@/components/id/form/forgotPasswordForm'
import Image from 'next/image'
import React from 'react'

export default function ForgotPasswordPage() {
  return (
    <div
      className="hero h-full"
      style={{
        backgroundImage: "url('/hero-auth2.svg')",
        backgroundSize: "cover",
        height: "100%",
      }}
    >
      <div className="flex flex-col xl:flex-row items-center w-full justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/text-hero-auth.png"
          alt="Welcome Image"
          className="mb-10 xl:mb-0 px-4 xl:px-0"
          // className="h-48 md:h-72 lg:h-80 w-screen object-cover mb-10 xl:w-1/2 xl:h-screen xl:mb-0"
        />
        <div className="w-full h-auto xl:w-1/2 flex items-center justify-center px-4 xl:px-0 xs:mb-4">
          {/* FORM */}
          <ForgotPasswordForm/>
        </div>
      </div>
    </div>
  )
}
