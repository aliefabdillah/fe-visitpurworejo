/* eslint-disable @next/next/no-img-element */
"use client";
import { artikelService } from "@/app/data/services";
import { Artikel, ArtikelHero } from "@/components/types/artikel";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import EmptyData from "../EmptyData";
import Pagination from "../pagination";
import Loading from "@/components/Loader/Loading";
import CardSkeleton from "@/components/Loader/CardSkeleton";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import ToastError from "../response/ToastResponse";

interface ArtikelListProps {
  editPage?: boolean;
  category?: string;
  status?: string;
  searchValue?: string;
  limit?: number;
  page?: number;
  isListPage?: boolean;
}

export default function ArtikelList({
  editPage,
  category,
  status,
  searchValue,
  limit,
  isListPage,
}: ArtikelListProps) {
  const [artikelData, setArtikelData] = useState<ArtikelHero[]>([]);
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

  useEffect(() => {
    if (isFirstRender) {
      if (currentPage > 1 && (category !== "" || searchValue !== "")) {
        setIsFirsRender(false);
        setCurrentPage(1);
        setIsFirsRender(true);
      }
    }
    loadData();
  }, [currentPage, category, searchValue, status]);

  const loadData = async () => {
    setIsLoading(true);
    var response;
    if (status) {
      response = await artikelService.getArtikelAccount(status);
    } else {
      response = await artikelService.getArtikel(
        category ? category : "",
        perPage,
        currentPage,
        searchValue ? searchValue : ""
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
      const artikelResult: any[] = response.data;
      const formattedArtikelData: ArtikelHero[] = artikelResult.map(
        (item: any) => {
          return {
            id: item.id,
            slug: item.slug,
            short_content: item.short_content,
            title: item.title,
            cover: {
              url: item.img_cover?.url,
              name: item.img_cover?.name,
            },
          };
        }
      );
      setArtikelData(formattedArtikelData);
      setTotalItems(
        response.meta?.pagination.total ? response.meta.pagination.total : 0
      );
      setIsLoading(false);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
          <CardSkeleton classname="h-72 max-w-full" totalItem={3} />
        </div>
      ) : artikelData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
          {artikelData.map((artikelItem) => (
            <div
              key={artikelItem.id}
              className="card card-compact bg-base-100 shadow-xl cursor-pointer"
            >
              <Link
                href={
                  !editPage
                    ? `/artikel/${artikelItem.slug}`
                    : status && status === "draft"
                    ? `/profil/edit-artikel/${artikelItem.slug}`
                    : "#"
                }
                className="rounded-lg group"
              >
                <figure>
                  <Image
                    width={1200}
                    height={1200}
                    src={
                      artikelItem.cover.url
                        ? artikelItem.cover.url
                        : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                    }
                    alt="Article Image"
                    className="h-56 object-cover max-w-full transition-transform transform-gpu duration-300 
                    scale-100 group-hover:scale-110 group-hover:rounded-lg"
                  />
                </figure>
                <div className="card-body text-ellipsis">
                  <h2 className="line-clamp-2 card-title hover:underline hover:font-extrabold overflow-hidden">
                    {artikelItem.title}
                  </h2>
                  <p className="line-clamp-5 lg:line-clamp-4 overflow-hidden">
                    {artikelItem.short_content}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <EmptyData halaman={intl ? intl.article.title : ""} />
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
