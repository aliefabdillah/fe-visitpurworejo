import React from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function EditProfilForm() {
  return (
    <form className="px-12">
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 my-3">
        <AccountCircleIcon sx={{ fontSize: 125 }} />
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Avatar</p>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Pick a file</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Name</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Username</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">What is your username?</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Email</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">What is your email?</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Nomor Telepon</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Nomor Telepon</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Asal Daerah</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Dari mana asal daerah anda?</span>
          </div>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          className="
              btn
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-xs lg:text-md xl:text-xl"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
