"use client";
import ArtikelList from "@/components/id/artikel/artikelList";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import DetailsWisata from "@/components/id/wisata/detailsWisata";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import HeroImage from "@/components/id/hero/hero-image";
import NavbarGreen from "@/components/id/navbar/navbarGreen";
import UlasanSection from "@/components/id/ulasan/ulasanSection";
import WisataList from "@/components/id/wisata/wisataList";
import React, { useEffect, useState } from "react";
import { wisataSlugService } from "@/app/data/services";
import { GalleryItem, Wisata } from "@/components/types/wisata";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import ToastError from "@/components/id/response/ToastResponse";

const galleryPlaceholder: GalleryItem[] = [
  {
    url: "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=...",
    name: "placeholder",
  },
];

const galleryNull: GalleryItem[] = [
  {
    url: "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image",
    name: "noimage",
  },
];

export default function DetailsDestinasiPage({
  params,
}: {
  params: { slug: string };
}) {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [wisataData, setWisataData] = useState<Wisata>();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const userSession = Cookies.get("session");
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
    var response;
    if (userSession) {
      response = await wisataSlugService.getDetailsWisataAuth(params.slug);
    } else {
      response = await wisataSlugService.getDetailsWisataPublic(params.slug);
    }

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
      setIsToastOpen(true);
    } else {
      const wisataResult: any = response.data;
      const formattedWisata: Wisata = {
        id: wisataResult.id,
        name: wisataResult.attributes.name,
        slug: wisataResult.attributes.slug,
        deskripsi: wisataResult.attributes.content,
        jenis_wisata: wisataResult.attributes.jenis_wisata,
        konten_singkat: wisataResult.attributes.short_content,
        map: wisataResult.attributes.map_link,
        tiket: wisataResult.attributes.tiket,
        gallery: wisataResult.attributes.gallery?.data?.map(
          (galleryitem: any) => ({
            url: galleryitem.attributes.url,
            name: galleryitem.attributes.name,
          })
        ),
        wisata_favorite: wisataResult.attributes.wisata_favorite_id?.data.map(
          (wisataFavoriteItem: any) => ({
            id: wisataFavoriteItem.id,
            wisata_id: wisataFavoriteItem.attributes.wisata_id,
            user_id: wisataFavoriteItem.attributes.user_id.data.id,
          })
        ),
      };
      setWisataData(formattedWisata);
    }
    setIsLoading(false);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div>
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <NavbarGreen />
      <HeroImage
        images={
          isLoading
            ? galleryPlaceholder
            : wisataData?.gallery
            ? wisataData.gallery
            : galleryNull
        }
      />
      <div className="flex flex-col min-h-screen items-center">
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              
            "
        >
          <NavBreadcumbs level1={"Destinasi"} level2={params.slug} />
        </div>
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mb-6
              
            "
        >
          <DetailsWisata slug={params.slug} wisataData={wisataData} />
        </div>
        <Divider15 />
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mb-6
              
            "
        >
          <QueryClientProvider client={queryClient}>
            <UlasanSection slug={params.slug} wisataId={wisataData?.id || 0} />
          </QueryClientProvider>
        </div>
        <Divider15 />
        <div
          className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mt-6 mb-16
              
            "
        >
          <h1
            className="
              text-primary font-extrabold text-4xl
              mb-8
            "
          >
            {intl ? intl.detailsWisata.recommendText : ""}
          </h1>
          <WisataList
            jenis="destinasi"
            slug={params.slug}
            isListPage={false}
            isRecommendList={true}
            limit={3}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
