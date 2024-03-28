/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

export default function HeroArtikel() {
  return (
    <div className="z-1">
      <Swiper
        effect="fade"
        spaceBetween={50}
        pagination={{
          // dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="mySwiper h-[25vh] md:h-[30vh] lg:h-[35vh] xl:h-[75vh] 2xl:h-[85vh]"
        style={
          {
            "--swiper-pagination-color": "#F5AA27",
            "--swiper-pagination-bullet-inactive-color": "#A0A0A0",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bottom": "24px",
            "--swiper-pagination-bullet-horizontal-gap": "15px",
          } as CSSProperties
        }
      >
        {/* <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="mb-16 hero-content text-center text-neutral-content">
              <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-5xl">
                <h1 className="mb-8 text-6xl font-bold">Hello there 1</h1>
                <p className="text-2xl mb-12">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <a className="btn btn-no-outline btn-secondary text-white">Read More!</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1523897056079-5553b57112d4?q=80&w=1541&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="mb-16 hero-content text-center text-neutral-content">
              <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-5xl">
                <h1 className="mb-8 text-6xl font-bold">Hello there 2</h1>
                <p className="text-2xl mb-12">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <a className="btn btn-no-outline btn-secondary text-white">Read More!</a>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        <SwiperSlide>
        <div
            className="hero h-full"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="mt-10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-5xl 2xl:max-w-6xl">
                <h1 className="mb-4 md:mb-8 text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-bold">Hello there 3</h1>
                <p className="sm:text-sm md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl mb-6 md:mb-12">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="
                  btn-sm xl:btn-md 2xl:btn-lg
                  rounded-lg 
                  bg-gradient-to-l from-accent from-10% to-secondary to-90%
                  hover:from-yellow-500 hover:to-orange-500
                  focus:outline-none
                  text-white font-medium">
                    <a href="/">Read More!</a>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
