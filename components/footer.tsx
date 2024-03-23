/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
export default function Footer() {
  return (
    <div className="flex flex-col bottom-0 w-full bg-primary text-white p-4 items-center">
      <div className="
      flex flex-col lg:flex-row items-center justify-between 
      mx-30 md:mx-40 mt-4 
      w-[60rem] xl:w-[80rem] 2xl:w-[100rem]">
        <div className="flex flex-row lg:flex-col items-center">
          <div className='mb-4 mr-6 lg:mr-0 lg:mb-0'>
            <Link href="/id/home" passHref>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo_white-2.svg"
                  alt="Visit Purworejo Logo"
                  className="h-14 w-auto"
                />
            </Link>
          </div>
          <div className="flex mt-3 lg:mb-0 mb-4">
            <div className="mr-4">
              <Link href='#'>
                <img
                  src='/icon/rounded-fb.svg'
                  alt='share fb icon'
                  className='h-5'
                />
              </Link>
            </div>
            <div className="mr-4">
              <Link href='#'>
                <img
                  src='/icon/rounded-twitter.svg'
                  alt='share twitter icon'
                  className='h-5'
                />
              </Link>
            </div>
            <div className="mr-4">
              <Link href='#'>
                <img
                  src='/icon/rounded-ig.svg'
                  alt='share ig icon'
                  className='h-5'
                />
              </Link>
            </div>
            <div className="mr-4">
              <Link href='#'>
                <img
                  src='/icon/rounded-yt.svg'
                  alt='share yt icon'
                  className='h-5'
                />
              </Link>
            </div>
            <div className="">
              <Link href='#'>
                <img
                  src='/icon/rounded-tt.svg'
                  alt='share tiktok icon'
                  className='h-5'
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-10">
            <p className='text-base'>Cookie Policy</p>
          </div>
          <div className="mr-10">
            <p className="text-base">Privacy Policy</p>
          </div>
          <div className="mr-10">
            <p className="text-base">Terms And Conditions</p>
          </div>
          <div>
            <p className="text-base">Contact Us</p>
          </div>
        </div>
      </div>
      <div className='mt-4 mb-4'>
        <p className='text-sm text-center'>
          © 2024 VisitPurworejo. All Rights Reserved
        </p>
      </div>
    </div>
  )
}
