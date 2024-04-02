import ArtikelList from "@/components/id/artikelList";
import WisataCard from "@/components/id/card/wisataCard";
import CeritaKami from "@/components/id/ceritaKami";
import Cta from "@/components/id/cta/cta";
import Divider35 from "@/components/id/divider/divider35";
import Footer from "@/components/id/footer";
import Gallery from "@/components/id/gallery/gallery";
import HeroArtikel from "@/components/id/hero/hero-artikel";
import NavbarGreen from "@/components/id/navbarGreen";
import React from "react";

export default function Homepage() {
  return (
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
            Wisata Populer
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
            Cerita Kami
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
            Galeri
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
            Panduan Wisata
          </h1>
          <ArtikelList/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
