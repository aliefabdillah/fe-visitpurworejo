/* eslint-disable @next/next/no-img-element */
"use client";
import { artikelService } from "@/app/data/services";
import { Artikel, ArtikelHero } from "@/components/types/artikel";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";

interface ArtikelListProps {
  editPage?: boolean;
  category?: string;
  limit?: number;
  page?: number;
}

export default function ArtikelList({
  editPage,
  category,
  limit,
  page,
}: ArtikelListProps) {
  const [artikelData, setArtikelData] = useState<ArtikelHero[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const { isLoading, error, data } = useQuery(
    "artikel-list-data",
    () =>
      artikelService.getArtikel(category ? category : "", limit ? limit : 3),
    {
      onSuccess(result) {
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
  );

  return (
    <div className="grid grid-cols-3 gap-6 justify-between mb-16">
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
                width={500}
                height={500}
                src={
                  artikelItem.cover.url
                    ? artikelItem.cover.url
                    : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                }
                alt="Article Image"
                className="h-56 transition-transform transform-gpu duration-300 
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
  );
}
