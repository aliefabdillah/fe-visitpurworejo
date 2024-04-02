import ArtikelList from "@/components/artikelList";
import NavBreadcumbs from "@/components/breadcumbs/navBreadcumbs";
import CtaWide from "@/components/cta/ctaWide";
import Divider15 from "@/components/divider/divider15";
import Footer from "@/components/footer";
import IntroSection from "@/components/introSection";
import NavbarWhite from "@/components/navbarWhite";
import Pagination from "@/components/pagination";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";

export default function ArtikelPage() {
  return (
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
          <NavBreadcumbs level1={"Artikel"} />
        </div>
        {/* INTRO */}
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2
            
          "
        >
          <IntroSection title={"Artikel"} />
        </div>
        <Divider15 />
        {/* List Article */}
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-6
            flex flex-col
          "
        >
          <div className="flex flex-row justify-between items-start mb-8">
            <select className="select text-lg select-bordered w-fit overflow-y-auto">
              <option disabled selected>
                Kategori
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index}>Option {index + 1}</option>
              ))}
            </select>
            <div className="join">
              <input
                type="text"
                className="input input-bordered join-item"
                placeholder="Cari..."
              />
              <button className="btn btn-secondary join-item rounded-lg">
                <SearchIcon sx={{ color: "#FFFFFF"}}/>
              </button>
            </div>
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <ArtikelList key={index} />
          ))}
          <Pagination />
        </div>
        <Divider15 />
      </div>
      <CtaWide />
      <Footer />
    </div>
  );
}
