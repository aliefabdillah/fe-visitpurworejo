"use client"
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import ArtikelList from "@/components/id/artikel/artikelList";
import WisataCard from "@/components/id/card/wisataCard";
import CeritaKami from "@/components/id/ceritaKami";
import Cta from "@/components/id/cta/cta";
import Divider35 from "@/components/id/divider/divider35";
import Footer from "@/components/id/footer";
import Gallery from "@/components/id/gallery/gallery";
import HeroArtikel from "@/components/id/hero/hero-artikel";
import NavbarGreen from "@/components/id/navbar/navbarGreen";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Homepage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const query = searchParams.get('lang')
  const queryClient = new QueryClient();
  
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";
  /* (async () => {
    const dict = await getDictionary(lang)
    setIntl(dict)
  })(); */

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();

    if (intl) {
      const params = new URLSearchParams(searchParams);
      params.set('lang', query || "id");
      router.replace(`${intl.page.home}?${params.toString()}`);
    }
  }, [lang, query, pathname, router, searchParams, intl]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavbarGreen />
        <HeroArtikel />
        <div className="flex flex-col min-h-screen items-center">
          {/* Wisata Populer */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-16
              flex flex-col
            "
          >
            <h1
              className="
                text-primary font-extrabold text-4xl
                mb-8
              "
            >
              {intl ? intl.home.wisataPopular.title : ""}
            </h1>
            <WisataCard />
          </div>
          <Divider35/>
          {/* Cerita Kami */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-16
            "
          >
            <h1
              className="
                text-primary font-extrabold text-4xl
                mb-8
              "
            >
              {intl ? intl.home.ourStory.title : ""}
            </h1>
            <CeritaKami />
          </div>
          {/* CTA SECTION */}
          <Cta/>
          <Divider35/>
          {/* Galeri */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-16
              flex flex-col
            "
          >
            <h1
              className="
                text-primary font-extrabold text-4xl
                mb-8
              "
            >
              {intl ? intl.home.gallery.title : ""}
            </h1>
            <Gallery/>
          </div>
          <Divider35/>
          {/* Panduan Wisata */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-16
              flex flex-col
            "
          >
            <h1
              className="
                text-primary font-extrabold text-4xl
                mb-8
              "
            >
              {intl ? intl.home.guideWisata.title : ""}
            </h1>
            <ArtikelList category="panduan-wisata" limit={3}/>
          </div>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
