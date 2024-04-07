import NavBreadcumbs from '@/components/id/breadcumbs/navBreadcumbs'
import Footer from '@/components/id/footer'
import NavbarWhite from '@/components/id/navbar/navbarWhite'
import EditArtikel from '@/components/id/profil/editArtikel'
import React from 'react'

export default function EditArtikelPage({params}:{params:{slug:string}}) {
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
          <NavBreadcumbs level1='Profil' level2='Edit Artikel' level3={params.slug}/>
        </div>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 mt-8 mb-4
            
          "
        >
          <EditArtikel/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
