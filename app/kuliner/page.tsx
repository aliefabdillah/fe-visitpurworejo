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
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const textIntroId = "Temukan beragam kuliner khas daerah yang memikat selera di destinasi wisata kuliner di Kabupaten Purworejo. Dari makanan tradisional hingga kuliner modern, nikmati pengalaman kuliner yang tak terlupakan yang akan memanjakan lidah Anda. Jelajahi keanekaragaman rasa dan aroma yang ditawarkan oleh destinasi wisata di Kabupaten Purworejo, dan temukan kenikmatan kuliner yang sesuai dengan selera Anda."

export default function KulinerPage() {
  const queryClient = new QueryClient()
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
            <NavBreadcumbs level1={"Kuliner"}/>
          </div>
          {/* INTRO */}
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2
              
            "
          >
            <IntroSection title={"Kuliner"} body={textIntroId}/>
          </div>
          <Divider15/>
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
              Mari Cicipi Kuliner Terbaik!
            </h1>
            <WisataList jenis="kuliner" isListPage={true}/>
          </div>
          <Divider15/>
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
              Ulasan Wisatawan
            </h1>
            <ReviewWisata jenis="kuliner"/>
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
