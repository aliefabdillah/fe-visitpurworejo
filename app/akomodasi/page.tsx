"use client"
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import Cta from "@/components/id/cta/cta";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import NavbarWhite from "@/components/id/navbar/navbarWhite";
import ReviewWisata from "@/components/id/wisata/reviewWisata";
import WisataList from "@/components/id/wisata/wisataList";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/id/pagination";
import IntroSection from "@/components/id/introSection";
import { QueryClient, QueryClientProvider } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

const textIntroId = "Nikmati pengalaman menginap yang unik dan nyaman di berbagai pilihan akomodasi yang kami tawarkan. Dari penginapan tradisional hingga resort modern, setiap tempat menginap di Kabupaten Purworejo memiliki daya tarik dan kenyamanan yang berbeda. Temukan tempat menginap ideal untuk menjadikan liburan Anda di Purworejo tak terlupakan."

export default function AkomodasiPage() {
  const queryClient = new QueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const query = searchParams.get('lang')
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
  }, [lang, query, pathname, router, searchParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavbarWhite />
        <div className="flex flex-col min-h-screen items-center">
          {/* BREADCUMBS */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mt-16 mb-4
              
            "
          >
            <NavBreadcumbs level1={"Akomodasi"} />
          </div>
          {/* INTRO */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2
              
            "
          >
            <IntroSection title={intl ? intl.accomodation.title : ""} body={intl ? intl.accomodation.intro : ""}/>
          </div>
          <Divider15 />
          {/* LIST */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              flex flex-col
            "
          >
            <h1
              className="
                text-primary font-bold text-4xl
                mb-8
              "
            >
              {intl ? intl.accomodation.wisataList.title : ""}
            </h1>
            <WisataList jenis="akomodasi" isListPage={true}/>
          </div>
          <Divider15 />
          {/* REVIEW */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              p-4 my-10
            "
          >
            <h1
              className="
                text-primary font-extrabold text-4xl
                mb-8
              "
            >
              {intl ? intl.accomodation.ulasanWisata.title : ""}
            </h1>
            <ReviewWisata jenis="akomodasi"/>
          </div>
          <Divider15 />
          {/* CTA */}
          <Cta />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
