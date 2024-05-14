"use client"
import ArtikelList from '@/components/id/artikel/artikelList'
import NavBreadcumbs from '@/components/id/breadcumbs/navBreadcumbs'
import DetailsWisata from '@/components/id/wisata/detailsWisata'
import Divider15 from '@/components/id/divider/divider15'
import Footer from '@/components/id/footer'
import HeroImage from '@/components/id/hero/hero-image'
import NavbarGreen from '@/components/id/navbar/navbarGreen'
import UlasanSection from '@/components/id/ulasan/ulasanSection'
import WisataList from '@/components/id/wisata/wisataList'
import React, { useEffect, useState } from 'react'
import { wisataSlugService } from '@/app/data/services'
import { Wisata } from '@/components/types/wisata'
import { StrapiErrorsProps } from '@/components/types/strapiErrors'
import Cookies from "js-cookie";


export default function DetailsDestinasiPage({params}:{params:{slug:string}}) {
  const [wisataData, setWisataData] = useState<Wisata>();
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const userSession = Cookies.get("session");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    var response
    if (userSession) {
      response = await wisataSlugService.getDetailsWisataAuth(params.slug)
    } else {
      response = await wisataSlugService.getDetailsWisataPublic(params.slug)
    }
    
    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const wisataResult: any = response.data
      const formattedWisata : Wisata = {
        id: wisataResult.id,
        name: wisataResult.attributes.name,
        slug: wisataResult.attributes.slug,
        deskripsi: wisataResult.attributes.content,
        jenis_wisata: wisataResult.attributes.jenis_wisata,
        konten_singkat: wisataResult.attributes.short_content,
        gallery: wisataResult.attributes.gallery?.data.map((galleryitem: any) => ({
          url: galleryitem.attributes.url,
          name: galleryitem.attributes.name,
        })),
        wisata_favorite: wisataResult.attributes.wisata_favorite_id?.data.map((wisataFavoriteItem: any) => ({
          id: wisataFavoriteItem.id,
          wisata_id: wisataFavoriteItem.attributes.wisata_id,
          user_id: wisataFavoriteItem.attributes.user_id.data.id
        })),
      }
      setWisataData(formattedWisata)
    }
  }

  return (
    <div>
      <NavbarGreen/>
      <HeroImage images={wisataData?.gallery}/>
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
          <DetailsWisata slug={params.slug} wisataData={wisataData}/>
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
          <WisataList jenis={wisataData?.jenis_wisata} isListPage={false} limit={3}/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
