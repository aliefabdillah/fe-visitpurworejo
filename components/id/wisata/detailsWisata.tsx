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
      var response 
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
                  <p>Hapus dari Favorit</p>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon sx={{ color: "#FFFFFF" }} />
                  <p>Tambah Ke Favorit</p>
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
        <div className="max-w-sm">
          <ShareIcon pageTitle={wisataData?.name ? wisataData.name : ""}/>
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
