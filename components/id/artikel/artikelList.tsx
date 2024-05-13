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

interface ArtikelListProps {
  editPage?: boolean;
  category?: string;
  limit?: number;
  page?: number;
  isListPage?: boolean;
}

export default function ArtikelList({
  editPage,
  category,
  limit,
  isListPage,
}: ArtikelListProps) {
  const [artikelData, setArtikelData] = useState<ArtikelHero[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(isListPage ? 9 : limit); // Jumlah item per halaman
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    const response = await artikelService.getArtikel(
      category ? category : "",
      perPage,
      currentPage
    );

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
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
      setTotalItems(response.meta.pagination.total);
    }
  };

  /* const { isLoading, error, data } = useQuery(
    "artikel-list-data",
    () =>
      artikelService.getArtikel(category ? category : "", limit ? limit : 25),
    {
      onSuccess(result) {
        console.log(result.data);
        if (result.error) {
          setError({
            message: result.error.message,
            name: result.error.name,
            status: result.error.status,
          });
        } else {
          const artikelResult: any[] = result.data;
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
        }
      },
      onError: () => {
        setError({
          message: "Request Timeout!",
          name: "Network Error",
          status: "500",
        });
      },
    }
  ); */

  const totalPages = Math.ceil(totalItems / perPage!);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {artikelData.length === 0 ? (
        <EmptyData halaman="Artikel" />
      ) : (
        <div className="grid grid-cols-3 gap-6 justify-between">
          {artikelData.map((artikelItem) => (
            <div
              key={artikelItem.id}
              className="card card-compact bg-base-100 shadow-xl cursor-pointer"
            >
              <Link
                href={
                  editPage
                    ? `/profil/edit-artikel/${artikelItem.slug}`
                    : `/artikel/${artikelItem.slug}`
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
