"use client";
import ArtikelList from "@/components/id/artikel/artikelList";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import CtaWide from "@/components/id/cta/ctaWide";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import IntroSection from "@/components/id/introSection";
import NavbarWhite from "@/components/id/navbar/navbarWhite";
import Pagination from "@/components/id/pagination";
import { Kategori } from "@/components/types/kategori";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { kategoriService } from "../data/services";

export default function ArtikelPage() {
  const queryClient = new QueryClient();
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);

  useEffect(() => {
    loadKategori()
  })

  const loadKategori = async () => {
    const response = await kategoriService.getListKategori();
    if (response.data) {
      const kategoriResult: any[] = response.data;
      const formatedKategoriData: Kategori[] = kategoriResult.map(
        (item: any) => {
          return {
            id: item.id.toString(),
            name: item.attributes.name,
            slug: item.attributes.slug,
          };
        }
      );
      setKategoriList(formatedKategoriData);
    }
  };

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
                <option value={""} hidden>
                  Kategori
                </option>
                {kategoriList.map((kategori, index) => (
                  <option key={index} value={kategori.name}>
                    {kategori.name}
                  </option>
                ))}
              </select>
              <div className="join">
                <input
                  type="text"
                  className="input input-bordered join-item"
                  placeholder="Cari..."
                />
                <button className="btn btn-secondary join-item rounded-lg">
                  <SearchIcon sx={{ color: "#FFFFFF" }} />
                </button>
              </div>
            </div>
            <ArtikelList isListPage={true} />
            {/* <Pagination /> */}
          </div>
        </div>
        <Divider15 />
        <CtaWide />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
