"use client"
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WisataList from "../wisata/wisataList";
import Divider15 from "../divider/divider15";
import { Wisata, WisataFavorite } from "@/components/types/wisata";
import { wisataFavoriteService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import Cookies from "js-cookie";
import { decryptUserId } from "@/components/lib/crypto";
import DeleteModal from "./DeleteFavoriteModal";
import { useSearchParams } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

export default function WisataFavorit() {
  const userId = Cookies.get("id");
  const [idUser, setIdUser] = useState<number | null>(parseInt(userId ? userId : ""));
  const [kategoriValue, setKategoriValue] = useState(10);

  const searchParams = useSearchParams()
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
    const handleCookiesChange = () => {
      const userSession = Cookies.get("id");
      setIdUser(userSession ? parseInt(userSession): 0)
    };

    handleCookiesChange(); // Check cookies initially

    const interval = setInterval(() => {
      handleCookiesChange();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setKategoriValue(parseInt(event.target.value))
  };

  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm md:text-xl">
          Show
          <select className="select select-bordered w-fit text-lg mx-2" onChange={handleInputChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          Entries
        </div>
        <button
          onClick={() => {
            (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
          }}
          className="
              btn btn-error
              hover:bg-red-900
              rounded-lg 
              focus:outline-none
              text-white font-bold text-xs lg:text-md xl:text-xl"
        >
          {intl ? intl.profile.accountData.favoriteTab.buttonText : ""} 
          <DeleteIcon/>
        </button>
      </div>
      <div className="my-6">
        <WisataList isListPage={true} userId={idUser ? idUser : 0} limit={kategoriValue}/>
      </div>
      <DeleteModal/>
    </div>
  );
}
