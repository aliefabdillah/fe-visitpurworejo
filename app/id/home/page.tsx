import WisataCard from "@/components/card/wisataCard";
import CeritaKami from "@/components/ceritaKami";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery/gallery";
import HeroArtikel from "@/components/hero/hero-artikel";
import NavbarGreen from "@/components/navbarGreen";
import NavbarWhite from "@/components/navbarWhite";
import React from "react";

export default function Homepage() {
  return (
    <div>
      <NavbarGreen />
      <HeroArtikel />
      <div className="flex flex-col min-h-screen items-center">
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 mt-10 mb-5
            flex flex-col
          "
        >
          <h1
            className="
              text-primary font-extrabold text-3xl
              mb-4
            "
          >
            Wisata Populer
          </h1>
          <WisataCard />
        </div>
        <div className="divider divider-secondary opacity-35"></div>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-5
          "
        >
          <h1
            className="
              text-primary font-extrabold text-3xl
              mb-4
            "
          >
            Cerita Kami
          </h1>
          <CeritaKami />
        </div>
        {/* <div className="divider divider-secondary opacity-35"></div> */}
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-5
            rounded-lg
            flex flex-row items-center
            bg-auto bg-center bg-no-repeat
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
          <button
            className="
              mr-12
              w-1/3
              btn-md 2xl:btn-lg
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
            "
          >
            <a href="/">COBA SEKARANG!</a>
          </button>
        </div>
        <div className="divider divider-secondary opacity-35"></div>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 mt-10 mb-5
            flex flex-col
          "
        >
          <h1
            className="
              text-primary font-extrabold text-3xl
              mb-4
            "
          >
            Galeri
          </h1>
          <Gallery/>
        </div>
        <div className="divider divider-secondary opacity-35"></div>
      </div>
      <Footer />
    </div>
  );
}
