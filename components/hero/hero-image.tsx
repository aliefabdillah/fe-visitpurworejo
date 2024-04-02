/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

export default function HeroImage({ image }: {image?: string[]}) {
  let length = 1
  if (image) {
    length = image.length
  }

  return (
    <div className="z-1">
      <Swiper
        effect="fade"
        spaceBetween={50}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        className="mySwiper h-[25vh] md:h-[30vh] lg:h-[35vh] xl:h-[75vh] 2xl:h-[85vh]"
        style={
          {
            "--swiper-navigation-color": "#F5AA27",
            "--swiper-navigation-size": "20px",
            "--swiper-pagination-color": "#F5AA27",
            "--swiper-pagination-bullet-inactive-color": "#A0A0A0",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bottom": "24px",
            "--swiper-pagination-bullet-horizontal-gap": "15px",
          } as CSSProperties
        }
      >
        {Array.from({ length: length }).map((_, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero h-full"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              }}
            >
              <div className="hero-overlay bg-opacity-50"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
