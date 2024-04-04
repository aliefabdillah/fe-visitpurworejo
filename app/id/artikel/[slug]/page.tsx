import ArtikelCreator from '@/components/id/artikel/artikelCreator'
import ArtikelList from '@/components/id/artikel/artikelList'
import NavBreadcumbs from '@/components/id/breadcumbs/navBreadcumbs'
import Divider15 from '@/components/id/divider/divider15'
import Footer from '@/components/id/footer'
import HeroImage from '@/components/id/hero/hero-image'
import NavbarGreen from '@/components/id/navbar/navbarGreen'
import ShareIcon from '@/components/id/shareIcon'
import React from 'react'

export default function DetailArtikelPage({params}:{params:{slug:string}}) {
  return (
    <div>
      <NavbarGreen />
      <HeroImage />
      <div className="flex flex-col min-h-screen items-center">
        <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              
            "
          >
          <NavBreadcumbs level1={"Artikel"} level2={params.slug}/>
        </div>
        <div className='
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
            '
          >
            <h1 className='text-6xl text-primary font-extrabold'>LOREM IPSUM DOLOR SIT AMET</h1>
        </div>
        <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164 bg-slate-500 h-screen
              px-2 mt-6 mb-2
              flex flex-col items-center justify-center
            "
          >
            <p>CONTENT</p>
        </div>
        <div className='
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-4
              flex flex-row justify-between items-center
            '
          >
            <ArtikelCreator/>
            <ShareIcon/>
        </div>
        <Divider15/>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-8
            flex flex-col
          "
        >
          <h1
            className="
              text-primary font-extrabold text-4xl
              mb-8
            "
          >
            Artikel Terkait
          </h1>
          <ArtikelList/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
