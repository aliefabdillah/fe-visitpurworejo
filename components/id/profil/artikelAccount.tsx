import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ArtikelList from "../artikel/artikelList";
import Divider15 from "../divider/divider15";
import CreateArtikelModal from "./createArtikelModal";
export default function ArtikelAccount() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center my-5">
        <select className="select select-bordered w-fit text-lg" defaultValue={1}>
          <option value={0}>Published</option>
          <option value={1}>Draft</option>
          <option value={2}>Verification</option>
        </select>
        <button
          className="
          btn btn-primary
          rounded-lg 
          focus:outline-none
          text-white font-bold text-xs lg:text-md xl:text-xl"
          onClick={() =>
            (
              document.getElementById("create_artikel_modal")! as HTMLDialogElement
            ).showModal()
          }
        >
          Buat Artikel
          <AddIcon />
        </button>
        <CreateArtikelModal/>
      </div>
      <ArtikelList editPage={true}/>
      <Divider15 />
    </div>
  );
}
