"use client";
import { artikelService } from "@/app/data/services";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import Footer from "@/components/id/footer";
import NavbarWhite from "@/components/id/navbar/navbarWhite";
import EditArtikel from "@/components/id/profil/editArtikel";
import ToastError from "@/components/id/response/ToastResponse";
import { Artikel } from "@/components/types/artikel";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function EditArtikelPage({
  params,
}: {
  params: { slug: string };
}) {
  const queryClient = new QueryClient();
  const [editedArtikel, setEditedArtikel] = useState<Artikel>();
  const [isToastOpen, setIsToastOpen] = useState(false);
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
    const response = await artikelService.getEditedArtikel(params.slug);

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
      setIsToastOpen(true);
    } else {
      const artikelResult: any = response.data;
      const formattedArtikelData: Artikel = {
        id: artikelResult.id,
        judul: artikelResult.title,
        slug: artikelResult.slug,
        short_content: artikelResult.short_content,
        tanggal_upload: artikelResult.publish_date,
        konten: artikelResult.content,
        status: artikelResult.status,
        cover: {
          url: artikelResult.img_cover?.url,
          name: artikelResult.img_cover?.name,
        },
        kategori: {
          id: artikelResult.kategori_id?.id,
          name: artikelResult.kategori_id?.name,
          slug: artikelResult.kategori_id?.slug,
        },
        uploader: {
          name: artikelResult.user_id?.username,
          img_profile: artikelResult.user_id?.img_profile.url,
        },
      };
      setEditedArtikel(formattedArtikelData);
    }
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ToastError
          error={strapiError}
          classname="alert-error"
          isOpen={isToastOpen}
          onClose={handleCloseToast}
        />
        <NavbarWhite />
        <div className="flex flex-col min-h-screen items-center">
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-11 mt-20 mb-4
              
            "
          >
            <NavBreadcumbs
              level1={"Profil"}
              level2={"Edit Artikel"}
              level3={params.slug}
            />
          </div>
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-11 mt-8 mb-4
              
            "
          >
            <EditArtikel artikelData={editedArtikel} />
          </div>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
