import DestinasiBreadcumbs from "@/components/breadcumbs/destinasi";
import WisataCard from "@/components/card/wisataCard";
import Cta from "@/components/cta";
import Divider15 from "@/components/divider/divider15";
import Footer from "@/components/footer";
import NavbarWhite from "@/components/navbarWhite";
import Pagination from "@/components/pagination";
import WisataList from "@/components/wisataList";
import React from "react";

export default function DestinasiPage() {
  return (
    <div>
      <NavbarWhite />
      <div className="flex flex-col min-h-screen items-center">
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 mt-16 mb-4
            
          "
        >
          <DestinasiBreadcumbs />
        </div>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2
            
          "
        >
          <h1 className="text-5xl font-extrabold text-primary mb-4">Destinasi</h1>
          <p className="font-normal text-lg">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.
          </p>
        </div>
        <Divider15/>
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
            Ayo Berpetualang!
          </h1>
          <WisataList />
          <Pagination/>
        </div>
        <Divider15/>
        {/* TODO: REVIEW WISATA */}
        <Divider15/>
        <Cta/>
      </div>
      <Footer />
    </div>
  );
}
