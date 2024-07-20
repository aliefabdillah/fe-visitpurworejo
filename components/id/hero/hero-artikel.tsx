/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import Link from "next/link";
import { ArtikelHero } from "@/components/types/artikel";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { artikelService } from "@/app/data/services";
import { useQuery } from "react-query";
import StrapiErrors from "../response/StrapiErrors";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function HeroArtikel() {
  const [artikelData, setArtikelData] = useState<ArtikelHero[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const searchParams = useSearchParams();
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

  /* GET HERO ARTIKEL */
  const { isLoading, error, data } = useQuery(
    "artikel-hero-data",
    () => artikelService.getHeroArtikel(),
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
          const formattedArtikelHeroData: ArtikelHero[] = artikelResult.map(
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
              };
            }
          );
          setArtikelData(formattedArtikelHeroData);
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
      <StrapiErrors error={strapiError} />
      {isLoading ? (
        <div className="skeleton h-[70vh] xl:h-screen 2xl:h-[85vh] w-full"></div>
      ) : (
        <div className="z-1">
          <Swiper
            effect="fade"
            spaceBetween={50}
            navigation={true}
            pagination={{
              // dynamicBullets: true,
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, EffectFade]}
            className="mySwiper h-[70vh] xl:h-screen 2xl:h-[85vh]"
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
            {artikelData.map((artikelItem) => (
              <SwiperSlide key={artikelItem.id}>
                <div
                  className="hero h-full"
                  style={{
                    backgroundImage: `url(${
                      artikelItem.cover.url
                        ? artikelItem.cover.url
                        : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                    })`,
                  }}
                >
                  <div className="hero-overlay bg-opacity-70"></div>
                  <div className="hero-content text-center text-neutral-content">
                    <div className="mt-10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-5xl 2xl:max-w-6xl">
                      <h1 className="mb-4 md:mb-8 text-3xl lg:text-4xl xl:text-6xl 2xl:text-8xl font-bold">
                        {artikelItem.title}
                      </h1>
                      <p className="text-sm md:text-md lg:text-lg xl:text-3xl 2xl:text-5xl mb-6 md:mb-12 line-clamp-3">
                        {artikelItem.short_content}
                      </p>
                      <Link href={`/artikel/${artikelItem.slug}`}>
                        <button
                          className="
                        btn-sm xl:btn-md 2xl:btn-lg
                        rounded-lg 
                        bg-gradient-to-l from-accent from-10% to-secondary to-90%
                        hover:from-yellow-500 hover:to-orange-500
                        focus:outline-none
                        text-white font-medium"
                        >
                          {intl ? intl.hero.buttonText : ""}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
