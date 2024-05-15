"use client";
import React, { CSSProperties, useState } from "react";
import { A11y, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewWisataCard from "../card/reviewWisataCard";
import "swiper/css";
import "swiper/css/navigation";
import { Ulasan } from "@/components/types/ulasan";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { useQuery } from "react-query";
import { ulasanService } from "@/app/data/services";
import EmptyData from "../EmptyData";

export default function ReviewWisata({ jenis }: { jenis?: string }) {
  const [reviewWisataData, setReviewWisataData] = useState<Ulasan[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const { isLoading, error, data } = useQuery(
    "review-wisata",
    () => ulasanService.getUlasanByJenis(jenis ? jenis : ""),
    {
      onSuccess(result) {
        if (result.error) {
          setError({
            message: result.error.message,
            name: result.error.name,
            status: result.error.status,
          });
        } else {
          const reviewResult: any[] = result.data;
          const formattedReviewData: Ulasan[] = reviewResult.length
            ? reviewResult.map((item) => {
                return {
                  id: item.id,
                  content: item.content,
                  like: item.like,
                  user_id: {
                    id: item.user_id.id,
                    username: item.user_id.username,
                    hometown: item.user_id.hometown,
                    img_profile: {
                      url: item.user_id.img_profile?.url,
                      name: item.user_id.img_profile?.name,
                    },
                  },
                };
              })
            : [];

          setReviewWisataData(formattedReviewData);
        }
      },
      onError() {
        setError({
          message: "Request Timeout!",
          name: "Network Error",
          status: "500",
        });
      },
    }
  );

  const dataToRender = reviewWisataData.length
    ? reviewWisataData.sort((a, b) => {
        return (
          (b.like ? parseInt(b.like) : 0) - (a.like ? parseInt(a.like) : 0)
        );
      })
    : [];

  return (
    <>
      {dataToRender.length === 0 ? 
        <EmptyData halaman="Ulasan"/>
      :
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
            "--swiper-navigation-size": "20px",
          } as CSSProperties
        }
      >
        {dataToRender.map((itemReview, index) => (
          <SwiperSlide key={index}>
            <ReviewWisataCard reviewWisata={itemReview} />
          </SwiperSlide>
        ))}
      </Swiper>
      }
    </>
  );
}
