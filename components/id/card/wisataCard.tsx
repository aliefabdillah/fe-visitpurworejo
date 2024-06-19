/* eslint-disable @next/next/no-img-element */
import { wisataService } from "@/app/data/services";
import CardSkeleton from "@/components/Loader/CardSkeleton";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { Wisata } from "@/components/types/wisata";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function WisataCard() {
  const [wisataPopularData, setWisataPopularData] = useState<Wisata[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const { isLoading, error, data } = useQuery(
    "wisata-popular-data",
    () => wisataService.getPopularWisata(),
    {
      onSuccess(result) {
        if (result.error) {
          setError({
            message: result.error.message,
            name: result.error.name,
            status: result.error.status,
          });
        } else {
          const wisataPopularResult: any[] = result.data;
          const formattedWisatPopularData: Wisata[] = wisataPopularResult.map(
            (item) => {
              return {
                id: item.id,
                name: item.name,
                slug: item.slug,
                jenis_wisata: item.jenis_wisata,
                img_cover: {
                  url: item.img_cover.url,
                  name: item.img_cover.name,
                },
                wisata_favorite: item.wisata_favorite_id.map(
                  (favoriteItem: any) => ({
                    id: favoriteItem.id,
                    wisata: favoriteItem.wisata_id,
                  })
                ),
              };
            }
          );

          setWisataPopularData(formattedWisatPopularData);
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

  const dataToRender = wisataPopularData.length
    ? wisataPopularData.sort((a, b) => {
        return (
          (b.wisata_favorite?.length || 0) - (a.wisata_favorite?.length || 0)
        );
      }).slice(0, 5)
    : [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {isLoading ? (
        <CardSkeleton
          classname="h-96 md:h-96 lg:h-96 xl:h-100 2xl:h-112"
          totalItem={5}
        />
      ) : (
        dataToRender.map((wisataPopularItem, key) => (
          <div key={key} className="relative overflow-hidden group rounded-lg">
            <Link
              href={`/${wisataPopularItem.jenis_wisata}/${wisataPopularItem.slug}`}
            >
              <Image
                width={500}
                height={500}
                className="
              h-96 md:h-96 lg:h-96 xl:h-100 2xl:h-112
              max-w-full object-cover
              transition-transform transform-gpu duration-300 
              scale-100 group-hover:scale-110 group-hover:rounded-lg cursor-pointer"
                src={
                  wisataPopularItem.img_cover?.url
                    ? wisataPopularItem.img_cover.url
                    : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                }
                alt="Wisata Image"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent from-5% to-zinc-900 to-100%"></div>
              <div className="absolute inset-0 flex items-end justify-center mb-8">
                <h1 className="text-white text-center font-extrabold">
                  {wisataPopularItem.name}
                </h1>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
