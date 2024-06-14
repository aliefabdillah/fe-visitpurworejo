/* eslint-disable @next/next/no-img-element */
"use client";
import {
  wisataFavoriteService,
  wisataService,
  wisataSlugService,
} from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { Wisata } from "@/components/types/wisata";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Pagination from "../pagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmptyData from "../EmptyData";
import Loading from "@/components/Loader/Loading";
import CardSkeleton from "@/components/Loader/CardSkeleton";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { usePathname, useSearchParams } from "next/navigation";
import ToastError from "../response/ToastResponse";
import Cookies from "js-cookie";
import { getRecommendations } from "@/components/lib/recommendation";

export default function WisataList({
  jenis,
  isListPage,
  isRecommendList,
  slug,
  limit,
  name,
  userId,
}: {
  jenis?: string;
  isListPage?: boolean;
  isRecommendList?: boolean;
  slug?: string;
  limit?: number;
  name?: string;
  userId?: number;
}) {
  const [wisataData, setWisataData] = useState<Wisata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(isListPage ? 9 : limit); // Jumlah item per halaman
  const [totalItems, setTotalItems] = useState(0);
  const [isFirstRender, setIsFirsRender] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

  // FETCH API CADANGAN
  useEffect(() => {
    if (isFirstRender) {
      if (name && totalItems < 9 && currentPage > 1) {
        setIsFirsRender(false);
        setCurrentPage(1);
        setIsFirsRender(true);
      }
    }
    loadData();
  }, [
    currentPage,
    isFirstRender,
    isRecommendList,
    name,
    totalItems,
    limit,
    slug,
  ]);

  const loadData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setIsLoading(true);
    var response;
    if (pathname.includes("/profil")) {
      response = await wisataFavoriteService.getWisataFavoriteUser(
        userId ? userId.toString() : "",
        currentPage,
        limit
      );
    } else if (isRecommendList) {
      const responseAllWisata = await wisataService.getWisataByJenis(
        name ? name : "",
        jenis ? jenis : ""
      );

      const responseDetailsWisata =
        await wisataSlugService.getDetailsWisataPublic(slug ? slug : "");

      response = getRecommendations(
        responseDetailsWisata.data,
        responseAllWisata.data
      );
      
    } else {
      response = await wisataService.getWisataByJenis(
        name ? name : "",
        jenis ? jenis : "",
        currentPage,
        perPage
      );
    }

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
      setIsToastOpen(true);
    } else {
      const wisataResult: any[] = response.data ? response.data : response;
      const formattedWisataData: Wisata[] = wisataResult.map((item: any) => {
        if (pathname.includes("/profil")) {
          return {
            id: item.attributes.wisata_id.data.id,
            name: item.attributes.wisata_id.data.attributes.name,
            slug: item.attributes.wisata_id.data.attributes.slug,
            lokasi: item.attributes.wisata_id.data.attributes.location,
            jenis_wisata:
              item.attributes.wisata_id.data.attributes.jenis_wisata,
            img_cover: {
              url: item.attributes.wisata_id.data.attributes.img_cover.data
                .attributes.url,
              name: item.attributes.wisata_id.data.attributes.img_cover.data
                .attributes.url,
            },
          };
        } else {
          return {
            id: item.id,
            name: item.attributes.name,
            slug: item.attributes.slug,
            lokasi: item.attributes.location,
            jenis_wisata: item.attributes.jenis_wisata,
            img_cover: {
              url: item.attributes.img_cover.data.attributes.url,
              name: item.attributes.img_cover.data.attributes.name,
            },
          };
        }
      });
      setIsLoading(false);
      setWisataData(formattedWisataData);
      setTotalItems(response.meta ? response.meta.pagination.total : 0);
    }
  };

  const totalPages = Math.ceil(totalItems / perPage!);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <>
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <CardSkeleton classname="h-72 max-w-full" totalItem={3} />
        </div>
      ) : 
      wisataData.length === 0 ? (
        <EmptyData halaman={intl ? intl.detailsWisata.title : ""} />
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5">
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
                    : jenis === "kuliner"
                    ? `/kuliner/${wisataItem.slug}`
                    : `/${wisataItem.jenis_wisata}/${wisataItem.slug}`
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
    </>
  );
}
