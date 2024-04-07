import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

export default function EditArtikelFormRight() {
  return (
    <div
      className="
      flex flex-col-reverse md:flex-col 
      w-full md:w-2/5 lg:w-3/12
      gap-5 items-center"
    >
      <div className="w-full flex flex-col gap-5">
        <a href="/id/artikel/Lorem-Ipsum">
          <button
            className="
              w-full
              btn btn-secondary 
              rounded-lg 
              focus:outline-none
              font-bold text-xs lg:text-md xl:text-lg 2xl:text-xl"
          >
            <RemoveRedEyeIcon />
            Preview
          </button>
        </a>
        <button
          className="
            w-full
            btn btn-outline btn-secondary
            rounded-lg 
            focus:outline-none
            font-bold text-xs lg:text-md xl:text-lg 2xl:text-xl"
        >
          <SaveIcon />
          Simpan Sebagai Draft
        </button>
        <button
          className="
            w-full
            btn btn-primary
            rounded-lg 
            focus:outline-none
            text-white font-bold text-xs lg:text-md xl:text-lg 2xl:text-xl"
        >
          <PublishIcon />
          Ajukan Publikasi
        </button>
      </div>
      <div className="w-full flex flex-col gap-5">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Tanggal Publikasi</p>
          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Kategori</p>
          <select
            className="select select-bordered w-full"
          >
            <option hidden>Choose Category</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </label>
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Cover Artikel</p>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </label>
        <p>
          *Lorem ipsum dolor sit amet consectetur. Tellus faucibus tincidunt
          libero adipiscing turpis nulla ac.
        </p>
        <PhotoSizeSelectActualIcon sx={{ fontSize: 200 }} />
      </div>
    </div>
  );
}
