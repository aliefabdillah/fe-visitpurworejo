import React from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function EditProfilForm() {
  return (
    <form className="px-12">
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 my-3">
        <AccountCircleIcon sx={{ fontSize: 125 }} />
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Foto</p>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Pilih File</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Nama</p>
          <input
            type="text"
            placeholder="John Doe"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Tuliskan nama lengkap / nama panjang</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Username</p>
          <input
            type="text"
            placeholder="John123"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Username digunakan untuk membedakan dengan pengguna lain dan akan ditampilkan disetiap halaman</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Email</p>
          <input
            type="text"
            placeholder="John@example.com"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Email digunakan untuk proses login, Mohon untuk disimpan agar tidak lupa</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Nomor Telepon</p>
          <input
            type="text"
            placeholder="+628123456789"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Nomor Telepon, awali dengan kode negara contoh:(+62)</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Asal Daerah</p>
          <input
            type="text"
            placeholder="Jakarta"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">Dari mana asal daerah Anda?</span>
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
