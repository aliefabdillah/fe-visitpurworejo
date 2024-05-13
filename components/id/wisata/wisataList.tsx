/* eslint-disable @next/next/no-img-element */
"use client";
import { wisataService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { Wisata } from "@/components/types/wisata";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Pagination from "../pagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmptyData from "../EmptyData";

export default function WisataList({
  jenis,
  isListPage,
}: {
  jenis?: string;
  isListPage?: boolean;
}) {
  const [wisataData, setWisataData] = useState<Wisata[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9); // Jumlah item per halaman
  const [totalItems, setTotalItems] = useState(0);

  // FETCH API CADANGAN
  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await wisataService.getWisataByJenis(
      jenis ? jenis : "",
      currentPage,
      perPage
    );

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const wisataResult: any[] = response.data;
      const formattedWisataData: Wisata[] = wisataResult.map((item: any) => {
        return {
          id: item.id,
          name: item.attributes.name,
          slug: item.attributes.slug,
          lokasi: item.attributes.location,
          img_cover: {
            url: item.attributes.img_cover.data.attributes.url,
            name: item.attributes.img_cover.data.attributes.name,
          },
        };
      });
      setWisataData(formattedWisataData);
      setTotalItems(response.meta.pagination.total);
    }
  };

  /* const { isLoading, error, data } = useQuery(
    "wisata-list-data",
    () => wisataService.getWisataByJenis(jenis ? jenis : "", currentPage, perPage),
    {
      onSuccess(result) {
        if (result.error) {
          setError({
            message: result.error.message,
            name: result.error.name,
            status: result.error.status,
          });
        } else {
          const wisataResult: any[] = result.data;
          const formattedWisataData: Wisata[] = wisataResult.map(
            (item: any) => {
              return {
                id: item.id,
                name: item.attributes.name,
                slug: item.attributes.slug,
                lokasi: item.attributes.location,
                img_cover: {
                  url: item.attributes.img_cover.data.attributes.url,
                  name: item.attributes.img_cover.data.attributes.name,
                },
              };
            }
          );
          setWisataData(formattedWisataData);
          setTotalItems(result.meta.pagination.total);
        }
      },
      onError() {
        setError({
          message: "Request Timeout!",
          name: "Network Error",
          status: "500",
        });
      },
    }
  ); */

  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {wisataData.length === 0 ? (
        <EmptyData halaman="Wisata" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wisataData.map((wisataItem, index) => (
            <div
              key={index}
              className="relative overflow-hidden group rounded-lg"
            >
              <Link
                href={
                  jenis === "destinasi"
                    ? `/destinasi/${wisataItem.slug}`
                    : jenis === "akomodasi"
                    ? `/akomodasi/${wisataItem.slug}`
                    : `/kuliner/${wisataItem.slug}`
                }
              >
                <img
                  className="
                    h-72
                    max-w-full object-cover
                    transition-transform transform-gpu duration-300 
                    scale-100 group-hover:scale-110 group-hover:rounded-lg cursor-pointer"
                  src={
                    wisataItem.img_cover?.url
                      ? wisataItem.img_cover.url
                      : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                  }
                  alt="Wisata Image"
                />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent from-10% to-zinc-900 to-100%"></div>
                <div className="absolute bottom-0 flex items-end px-8 my-6">
                  <div className="text-white text-start">
                    <h1
                      className="
                      text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
                      font-extrabold mb-1"
                    >
                      {wisataItem.name}
                    </h1>
                    <h3 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                      {wisataItem.lokasi}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {isListPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      {/* <div className="flex flex-row gap-8 mt-10 items-center justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="
          btn btn-md 2xl:btn-lg
          rounded-lg 
          bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500
          focus:outline-none
          text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
        "
        >
          <ChevronLeftIcon fontSize="large" sx={{ color: "#FFFFFF" }} />
          Prev
        </button>
        <p className="text-lg">
          {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage == totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="
          btn btn-md 2xl:btn-lg
          rounded-lg 
          bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500
          focus:outline-none
          text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
        "
        >
          Next
          <ChevronRightIcon fontSize="large" sx={{ color: "#FFFFFF" }} />
        </button>
      </div> */}
    </>
  );
}
