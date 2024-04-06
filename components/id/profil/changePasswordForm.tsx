import React from 'react'

export default function ChangePasswordForm() {
  return (
    <form className="px-12">
      <div className="flex flex-row items-start gap-4 my-2">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Password Lama</p>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
          />
          <div className="label">
            <span className="label-text">Masukan Password sebelumnya yang ingin diganti dari akun anda</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full">
          <p className="font-bold text-xl mb-2">Password Baru</p>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
          />
          <div className="label">
            <span className="label-text">Masukan password baru untuk akun anda</span>
          </div>
        </label>
      </div>
      <div className="flex flex-row items-start gap-4 my-6">
        <label className="form-control w-full ">
          <p className="font-bold text-xl mb-2">Verifikasi Password</p>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
          />
          <div className="label">
            <span className="label-text">Masukan kembali password baru akun anda</span>
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
          Ubah Password
        </button>
      </div>
    </form>
  )
}
