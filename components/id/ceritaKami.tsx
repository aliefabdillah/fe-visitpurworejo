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

export default function CeritaKami() {
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
            "--swiper-navigation-size": "20px"
          } as CSSProperties
        }
      >
        {Array.from({ length: 6}).map((_, index) => (
          <SwiperSlide key={index}>
            <Link href="/id/artikel/New-Album">
              <CeritaKamiCard/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
