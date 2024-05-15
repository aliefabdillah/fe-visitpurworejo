import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function DeactivateAccountModal() {
  return (
    <dialog id="deactivate_account_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-4">Apakah anda yakin?</h3>
        <div
          role="alert"
          className="alert bg-secondary bg-opacity-30 mb-4 rounded-none"
        >
          <WarningAmberIcon />
          <span>
            <b>Peringatan</b>: Baca hal dibawah ini untuk mengatasi kemungkinan
            terburuk!
          </span>
        </div>
        <p className="mb-4">
          Proses nonaktifkan akun akan menghentikan akses Anda ke fitur-fitur
          kami dan menghapus informasi pribadi Anda dari tampilan publik. Anda
          dapat mengaktifkan kembali akun Anda kapan saja dengan login kembali
          ke platform kami.
        </p>
        <form>
          <label className="form-control w-full">
            <span className="label-text text-error">
              *Tuliskan username akun untuk mengkonfirmasi
            </span>
            <input
              type="text"
              placeholder="JohnDoe"
              className="input input-bordered w-full"
              required
            />
          </label>
          <button
            className="
              my-4
              w-full
              btn
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-xs lg:text-md xl:text-lg"
          >
            Saya yakin untuk menonaktifkan akun
          </button>
        </form>
      </div>
    </dialog>
  );
}
