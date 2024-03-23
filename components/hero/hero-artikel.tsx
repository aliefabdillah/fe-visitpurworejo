/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { CSSProperties, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

export default function HeroArtikel() {

  return (
    <div className="z-1">
      <Swiper
        effect="fade"
        spaceBetween={50}
        pagination={{
          // dynamicBullets: true,
          clickable: true
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="mySwiper"
        style={{
          "--swiper-pagination-color": "#F5AA27",
          "--swiper-pagination-bullet-inactive-color": "#A0A0A0",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bottom": "24px",
          "--swiper-pagination-bullet-horizontal-gap": "15px",
          "width": "100%",
          "height": "85vh"
        } as CSSProperties}
      >
        <SwiperSlide>
          <img 
            src="https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="h-full w-full object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="https://images.pexels.com/photos/1276518/pexels-photo-1276518.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-full h-full object-fill" 
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
