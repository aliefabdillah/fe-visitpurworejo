"use client";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IntroSection from "../introSection";
import ShareIcon from "../shareIcon";
import { Wisata } from "@/components/types/wisata";
import Cookies from "js-cookie";
import { decryptUserId } from "@/components/lib/crypto";
import { wisataFavoriteService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import SuccessModal from "../response/SuccessModal";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function DetailsWisata({
  slug,
  wisataData,
}: {
  slug: string;
  wisataData?: Wisata;
}) {
  const [idUser, setIdUser] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState("");
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

  // MODAL SUCCESS HANDLER
  useEffect(() => {
    if (isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isSuccess]);

  // COOKIES WATCHER
  useEffect(() => {
    const handleCookiesChange = () => {
      const userSession = Cookies.get("id");
      if (userSession) {
        decryptUserId(userSession).then((id) => setIdUser(id));
      } else {
        setIdUser(null);
      }
    };

    handleCookiesChange(); // Check cookies initially

    const interval = setInterval(() => {
      handleCookiesChange();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* CHECK IS ID IN WISATA FAVORITE */
  const isFavorite = wisataData?.wisata_favorite?.some(
    (item) => item.user_id === idUser
  );

  /* HANDLE FAVORITE BUTTON CLICKER */
  const handleFavoriteButton = async (id: string, method: string) => {
    setIsLoading(true);

    try {
      var response;
      if (method === "ADD") {
        response = await wisataFavoriteService.addToFavorite(id);
      } else {
        response = await wisataFavoriteService.deleteFromFavorite(id);
      }

      if (response.error) {
        setError({
          message: response.error.message,
          name: response.error.name,
          status: response.error.status,
        });
      } else {
        setResponseSuccess(response.message);
        setIsSuccess(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Delete failed:", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <SuccessModal message={responseSuccess} />
      <ModalLoadingLite isOpen={isLoading} />
      <div>
        {idUser && (
          <div className="flex item-center justify-end mb-8">
            <button
              className="
            btn text-white
            bg-gradient-to-l from-accent from-10% to-red-500 to-90%
            hover:from-yellow-500 hover:to-red-700
            outline-none
            text-xl"
              onClick={() =>
                handleFavoriteButton(
                  wisataData?.id ? wisataData.id.toString() : "",
                  isFavorite ? "DELETE" : "ADD"
                )
              }
            >
              {isFavorite ? (
                <>
                  <FavoriteIcon sx={{ color: "#FFFFFF" }} />
                  <p>{intl ? intl.detailsWisata.deleteButtonText : ""}</p>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon sx={{ color: "#FFFFFF" }} />
                  <p>{intl ? intl.detailsWisata.addButtonText : ""}</p>
                </>
              )}
            </button>
          </div>
        )}
        <IntroSection
          title={wisataData?.name ? wisataData.name : ""}
          body={formatToHTML(wisataData?.deskripsi)}
          titleClass="text-5xl md:text-7xl lg:text-8xl mb-8 mt-3"
        />
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row items-center gap-2">
            <svg
              className="w-12 h-12 fill-primary dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill=""
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clip-rule="evenodd"
              />
            </svg>

            <span className="text-2xl hover:underline hover:font-semibold">
              <Link href={wisataData?.map ? wisataData.map : ""}>
                {intl ?  intl.detailsWisata.mapLinkText : ""}
              </Link>
            </span>
          </div>
          <div className="max-w-sm mb-4">
            <ShareIcon pageTitle={wisataData?.name ? wisataData.name : ""} />
          </div>
        </div>
      </div>
    </>
  );
}

function formatToHTML(text: string | undefined) {
  if (text === undefined) return undefined;
  return text.replace(/\n\n/g, "<br>");
}

async function decrypt(id: string | undefined) {
  if (id === undefined) return undefined;
  return await decryptUserId(id);
}
