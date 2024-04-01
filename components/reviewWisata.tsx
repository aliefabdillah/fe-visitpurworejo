"use client";
import React, { CSSProperties } from 'react'
import { A11y, FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ReviewWisataCard from './card/reviewWisataCard'
import "swiper/css";
import "swiper/css/navigation";

export default function ReviewWisata() {
  return (
    <>
      <Swiper
        slidesPerView={3}
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
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
            <ReviewWisataCard/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
