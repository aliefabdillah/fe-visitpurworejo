import ArtikelList from "@/components/artikelList";
import WisataCard from "@/components/card/wisataCard";
import CeritaKami from "@/components/ceritaKami";
import Cta from "@/components/cta/cta";
import Divider35 from "@/components/divider/divider35";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery/gallery";
import HeroArtikel from "@/components/hero/hero-artikel";
import NavbarGreen from "@/components/navbarGreen";
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
