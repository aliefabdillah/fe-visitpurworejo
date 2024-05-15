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

export default function WisataFavorit() {
  const [idUser, setIdUser] = useState<number | null>(null);
  const [kategoriValue, setKategoriValue] = useState(10);

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setKategoriValue(parseInt(event.target.value))
  };


  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl">
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
          Hapus Semua
          <DeleteIcon/>
        </button>
      </div>
      <div className="my-6">
        <WisataList isListPage={true} userId={idUser ? idUser : 0} limit={kategoriValue}/>
      </div>
      <Divider15/>
      <DeleteModal/>
    </div>
  );
}
