import ArtikelList from "@/components/artikelList";
import WisataCard from "@/components/card/wisataCard";
import CeritaKami from "@/components/ceritaKami";
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
        <div className="divider divider-secondary opacity-35"></div>
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
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-12
            rounded-lg
            flex flex-row items-center
            bg-center
          "
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <p
            className="
            text-white font-extrabold 
              text-2xl xl:text-5xl 2xl:text-6xl
              p-4 2xl:p-10 
              leading-tight 2xl:leading-looose
            "
          >
            Bagikan Pengalamanmu dan Dapatkan Hadiah Menarik
          </p>
          <a href="/" className="mr-12 w-1/3">
            <button
              className="
                w-full
                btn-md 2xl:btn-lg
                rounded-lg 
                bg-gradient-to-l from-accent from-10% to-secondary to-90%
                hover:from-yellow-500 hover:to-orange-500
                focus:outline-none
                text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
              "
            >
              COBA SEKARANG!
            </button>
          </a>
        </div>
        <div className="divider divider-secondary opacity-35"></div>
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
        <div className="divider divider-secondary opacity-35"></div>
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
