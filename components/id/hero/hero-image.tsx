/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { GalleryItem } from "@/components/types/wisata";

export default function HeroImage({
  images,
  singleImage,
}: {
  images?: GalleryItem[];
  singleImage?: string;
}) {
  let navigationState = false;
  if (images) {
    navigationState = true;
  }

  return (
    <div className="z-1">
      <Swiper
        effect="fade"
        spaceBetween={50}
        navigation={navigationState}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        className="mySwiper h-[55vh] xl:h-screen 2xl:h-[85vh]"
        style={
          {
            "--swiper-navigation-color": "#F5AA27",
            "--swiper-navigation-size": "15px",
            "--swiper-navigation-sides-offset": "55px;",
            "--swiper-pagination-color": "#F5AA27",
            "--swiper-pagination-bullet-inactive-color": "#A0A0A0",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bottom": "24px",
            "--swiper-pagination-bullet-horizontal-gap": "15px",
          } as CSSProperties
        }
      >
        {singleImage ? (
          <SwiperSlide>
            <div
              className="hero h-full"
              style={{
                backgroundImage: `url(${
                  singleImage
                    ? singleImage
                    : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                })`,
                backgroundPosition: "center",
              }}
            >
              <div className="hero-overlay bg-opacity-50"></div>
            </div>
          </SwiperSlide>
        ) : (
          images?.map((imageItem, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero h-full"
                style={{
                  backgroundImage: `url(${
                    imageItem.url
                      ? imageItem.url
                      : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                  })`,
                  backgroundPosition: "center",
                }}
              >
                <div className="hero-overlay bg-opacity-50"></div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
