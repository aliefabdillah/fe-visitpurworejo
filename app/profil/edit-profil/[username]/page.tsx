import NavBreadcumbs from '@/components/id/breadcumbs/navBreadcumbs'
import Divider15 from '@/components/id/divider/divider15'
import Divider35 from '@/components/id/divider/divider35'
import Footer from '@/components/id/footer'
import NavbarWhite from '@/components/id/navbar/navbarWhite'
import AccountSettings from '@/components/id/profil/accountSettings'
import ChangePassword from '@/components/id/profil/changePassword'
import EditProfilForm from '@/components/id/profil/editProfil'
import EditProfil from '@/components/id/profil/editProfil'
import React from 'react'

export default function EditProfilePage({params}:{params: {username: string}}) {
  return (
    <div>
      <NavbarWhite/>
      <div className='flex flex-col min-h-screen items-center'>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 mt-20 mb-4
            
          "
        >
          <NavBreadcumbs level1='Profil' level2='Edit Profil'/>
        </div>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 my-5
            
          "
        >
          <EditProfilForm/>
        </div>
        <Divider35/>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 mt-4
            
          "
        >
          <ChangePassword/>
        </div>
        <Divider35/>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 mt-4 mb-20
             
          "
        >
          <AccountSettings/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
