import ArtikelList from '@/components/id/artikelList'
import NavBreadcumbs from '@/components/id/breadcumbs/navBreadcumbs'
import DetailsWisata from '@/components/id/detailsWisata'
import Divider15 from '@/components/id/divider/divider15'
import Footer from '@/components/id/footer'
import HeroImage from '@/components/id/hero/hero-image'
import NavbarGreen from '@/components/id/navbarGreen'
import UlasanSection from '@/components/id/ulasan/ulasanSection'
import WisataList from '@/components/id/wisataList'
import React from 'react'

const images = [
  "https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default function DetailsDestinasiPage({params}:{params:{slug:string}}) {
  return (
    <div>
      <NavbarGreen/>
      <HeroImage image={images}/>
      <div className="flex flex-col min-h-screen items-center">
        <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              
            "
          >
          <NavBreadcumbs level1={"Artikel"} level2={params.slug}/>
        </div>
        <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mb-6
              
            "
          >
          <DetailsWisata slug={params.slug}/>
        </div>
        <Divider15/>
        <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mb-6
              
            "
          >
          <UlasanSection/>
        </div>
        <Divider15/>
        <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mt-6 mb-16
              
            "
          >
          <h1
            className="
              text-primary font-extrabold text-4xl
              mb-8
            "
          >
            Rekomendasi Wisata
          </h1>
          <WisataList/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
