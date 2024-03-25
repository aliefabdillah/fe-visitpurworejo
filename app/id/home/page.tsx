import CardWisata from "@/components/cardWisata";
import Footer from "@/components/footer";
import HeroArtikel from "@/components/hero/hero-artikel";
import NavbarGreen from "@/components/navbarGreen";
import NavbarWhite from "@/components/navbarWhite";
import React from "react";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarGreen />
      <HeroArtikel />
      <div className="flex flex-col items-center flex-grow">
        <div
          className="
      w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
      p-4 my-5
      flex flex-col
      outline"
        >
          <h1
            className="
        text-primary font-extrabold text-3xl
        mb-4"
          >
            Wisata Populer
          </h1>
          <CardWisata />
        </div>
      </div>
      <Footer />
    </div>
  );
}
