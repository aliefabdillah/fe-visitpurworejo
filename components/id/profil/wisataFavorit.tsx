import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WisataList from "../wisata/wisataList";
import Divider15 from "../divider/divider15";

export default function WisataFavorit() {
  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl">
          Show
          <select className="select select-bordered w-fit text-lg mx-2">
            <option selected>10</option>
            <option selected>25</option>
            <option selected>50</option>
          </select>
          Entries
        </div>
        <button
          className="
              w-full md:w-fit
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
        <WisataList />
      </div>
      <Divider15/>
    </div>
  );
}
