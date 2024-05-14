"use client"
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import Cta from "@/components/id/cta/cta";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import IntroSection from "@/components/id/introSection";
import NavbarWhite from "@/components/id/navbar/navbarWhite";
import Pagination from "@/components/id/pagination";
import ReviewWisata from "@/components/id/wisata/reviewWisata";
import WisataList from "@/components/id/wisata/wisataList";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function WisataSearchPage() {
  const queryClient = new QueryClient()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  
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
            <NavBreadcumbs level1={"Destinasi"}/>
          </div>
          {/* INTRO */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2
              
            "
          >
            <h1 className={`font-extrabold text-5xl text-primary mb-4`}>Hasil Pencarian:</h1>
          </div>
          {/* LIST */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              flex flex-col
            "
          >
            <WisataList jenis="" isListPage={true} name={searchQuery ? searchQuery : ""}/>
          </div>
          <Divider15/>
          {/* CTA */}
          <Cta/>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
