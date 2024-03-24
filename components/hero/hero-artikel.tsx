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
        className="mySwiper"
        style={
          {
            "--swiper-pagination-color": "#F5AA27",
            "--swiper-pagination-bullet-inactive-color": "#A0A0A0",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bottom": "24px",
            "--swiper-pagination-bullet-horizontal-gap": "15px",
            width: "100%",
            height: "85vh",
          } as CSSProperties
        }
      >
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
        <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="mb-16 hero-content text-center text-neutral-content">
              <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-5xl">
                <h1 className="mb-8 text-6xl font-bold">Hello there 3</h1>
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
      </Swiper>
    </div>
  );
}
