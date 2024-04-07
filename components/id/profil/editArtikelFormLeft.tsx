import React from "react";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import("../custom-editor"), { ssr: false });

export default function EditArtikelFormLeft() {
  return (
    <div className="flex flex-col gap-4 w-full md:w-3/5 lg:w-9/12">
      <label className="form-control w-full">
        <p className="font-bold text-xl mb-2">Judul</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <p className="font-bold text-xl mb-2">Slug</p>
        <label className="input input-bordered flex items-center gap-5 p-0 ps-5">
          Slug  
          <input
            type="text"
            placeholder="Type here"
            className="input w-full"
            disabled
          />
        </label>
      </label>
      <label className="form-control w-full">
        <p className="font-bold text-xl mb-1">Deskripsi Singkat</p>
        <p className="text-xs mb-2">*Max 255 characters</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      {/* Full Content */}
      <label className="form-control w-full">
        <p className="font-bold text-xl mb-2">Konten Artikel</p>
        <CustomEditor />
      </label>
    </div>
  );
}
