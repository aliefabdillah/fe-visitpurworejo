"use client";
import { artikelService } from "@/app/data/services";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import ArtikelCreator from "@/components/id/artikel/artikelCreator";
import ArtikelList from "@/components/id/artikel/artikelList";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import HeroImage from "@/components/id/hero/hero-image";
import NavbarGreen from "@/components/id/navbar/navbarGreen";
import ShareIcon from "@/components/id/shareIcon";
import { capitalizeEachWord } from "@/components/lib/formatter";
import { Artikel } from "@/components/types/artikel";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function DetailArtikelPage({
  params,
}: {
  params: { slug: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [artikelData, setArtikelData] = useState<Artikel>();
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await artikelService.getArtikelDetail(params.slug);

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const artikelResult: any = response.data;
      const formattedArtikelData: Artikel = {
        id: artikelResult.id,
        judul: artikelResult.title,
        slug: artikelResult.slug,
        short_content: artikelResult.short_content,
        tanggal_upload: artikelResult.publish_date,
        konten: artikelResult.content,
        cover: {
          url: artikelResult.img_cover?.url,
          name: artikelResult.img_cover?.name,
        },
        uploader: {
          name: artikelResult.user_id?.username,
          img_profile: artikelResult.user_id?.img_profile?.url,
        },
        kategori: {
          id: artikelResult.kategori_id?.id,
          name: artikelResult.kategori_id?.name,
          slug: artikelResult.kategori_id?.slug,
        },
      };
      setArtikelData(formattedArtikelData);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <NavbarGreen />
      <HeroImage
        singleImage={
          isLoading
            ? "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=..."
            : artikelData?.cover?.url
            ? artikelData.cover.url
            : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
        }
      />

      <div className="flex flex-col min-h-screen items-center">
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              
            "
        >
          <NavBreadcumbs level1={"Artikel"} level2={params.slug} />
        </div>
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
            "
        >
          <h1 className="text-6xl text-primary font-extrabold">
            {capitalizeEachWord(artikelData?.judul ? artikelData.judul : "")}
          </h1>
        </div>
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mb-6
            "
        >
          <div className="border-b border-stone-300 py-2">
            <p className="font-normal text-lg">{artikelData?.short_content}</p>
          </div>
        </div>
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mb-2
            "
        >
          <div
            dangerouslySetInnerHTML={{
              __html: artikelData ? artikelData.konten : "",
            }}
          />
        </div>
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-4
              flex flex-row justify-between items-center
            "
        >
          <ArtikelCreator artikelData={artikelData} />
          <ShareIcon pageTitle={artikelData?.judul ? artikelData.judul : ""} />
        </div>
        <Divider15 />
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-8
            flex flex-col
          "
        >
          <h1
            className="
              text-primary font-extrabold text-4xl
              mb-8
            "
          >
            {intl ? intl.article.details.relatedArticle : ""}
          </h1>
          <ArtikelList
            category={
              artikelData?.kategori?.slug ? artikelData.kategori.slug : ""
            }
            limit={3}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
