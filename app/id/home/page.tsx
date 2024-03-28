
import WisataCard from "@/components/card/wisataCard";
import CeritaKami from "@/components/ceritaKami";
import Footer from "@/components/footer";
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
        mb-4"
          >
            Wisata Populer
          </h1>
          <WisataCard/>
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
        mb-4"
          >
            Cerita Kami
          </h1>
          <CeritaKami/>
        </div>
        <div className="divider divider-secondary opacity-35"></div>
      </div>
      <Footer />
    </div>
  );
}
