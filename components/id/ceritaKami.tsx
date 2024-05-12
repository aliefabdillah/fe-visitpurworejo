/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, A11y, Navigation } from "swiper/modules";
import CeritaKamiCard from "./card/ceritaKamiCard";
import Link from "next/link";
import { CeritaKamiProps } from "../types/artikel";
import { StrapiErrorsProps } from "../types/strapiErrors";
import { useQuery } from "react-query";
import { artikelService } from "@/app/data/services";

export default function CeritaKami() {
  const [artikelData, setArtikelData] = useState<CeritaKamiProps[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const { isLoading, error, data } = useQuery(
    "cerita-kami",
    () => artikelService.getCeritaKami(),
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
          const formattedArtikelData: CeritaKamiProps[] = artikelResult.map(
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
                user: {
                  username: item.user_id.username,
                  hometown: item.user_id.hometown,
                  img_profile: item.user_id.img_profile?.url
                }
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
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        navigation={true}
        loop={true}
        modules={[FreeMode, A11y, Navigation]}
        className="mySwiper"
        style={
          {
            "--swiper-navigation-color": "#F5AA27",
            "--swiper-navigation-size": "20px",
          } as CSSProperties
        }
      >
        {artikelData.map((artikelItem) => (
          <SwiperSlide key={artikelItem.id}>
            <Link href={`/artikel/${artikelItem.slug}`}>
              <CeritaKamiCard ceritaData={artikelItem}/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
