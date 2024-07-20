/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import ModalGallery from "./modalGallery";
import { Wisata } from "@/components/types/wisata";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { useQuery } from "react-query";
import { wisataService } from "@/app/data/services";
import CardSkeleton from "@/components/Loader/CardSkeleton";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<Wisata[]>([]);
  const [selectedGalleryData, setSelectedGalleryData] = useState<any>(null);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const { isLoading, error, data } = useQuery(
    "gallery-data",
    () => wisataService.getGallery(),
    {
      onSuccess(result) {
        if (result.error) {
          setError({
            message: result.error.message,
            name: result.error.name,
            status: result.error.status,
          });
        } else {
          const galleryResult: any[] = result.data;
          const formattedGalleryData: Wisata[] = galleryResult.map(
            (item: any) => {
              return {
                id: item.id,
                name: item.attributes.name,
                deskripsi: item.attributes.content,
                slug: item.attributes.slug,
                img_cover: {
                  url: item.attributes.img_cover.data.attributes.url,
                  name: item.attributes.img_cover.data.attributes.name,
                },
              };
            }
          );

          setGalleryData(formattedGalleryData);
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

  const handleDetailGallery = (galleryData: Wisata) => {
    setSelectedGalleryData(galleryData);
    (
      document.getElementById("gallery_modal")! as HTMLDialogElement
    ).showModal();
  };

  const handleModalClose = () => {
    setSelectedGalleryData(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {isLoading ? (
        <CardSkeleton totalItem={10} classname="h-56 max-w-full" />
      ) : (
        galleryData.map((galleryItem) => (
          <div
            key={galleryItem.id}
            className="relative overflow-hidden group rounded-lg cursor-pointer"
            onClick={() => handleDetailGallery(galleryItem)}
          >
            <img
              className="
                h-56
                max-w-full object-cover
                transition-transform transform-gpu duration-300 
                scale-100 group-hover:scale-110 rounded-lg"
              src={
                galleryItem.img_cover?.url
                  ? galleryItem.img_cover.url
                  : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
              }
              alt={`Gallery`}
            />
            <div
              className="
                absolute inset-0 bg-black bg-opacity-50
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              <span className="text-white text-lg font-bold">
                {galleryItem.name}
              </span>
            </div>
          </div>
        ))
      )}
      <ModalGallery
        galleryData={selectedGalleryData}
        onClose={handleModalClose}
      />
    </div>
  );
}
