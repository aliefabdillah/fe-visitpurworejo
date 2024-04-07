import React from "react";

export default function ModalReport() {
  return (
    <dialog id="report_modal" className="modal modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-2xl text-center mb-4 font-bold">
          Laporkan Komentar
        </h3>
        <form>
          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text font-bold">
                Kenapa Anda Melaporkan komentar ini?
              </span>
            </div>
            <select className="select select-bordered w-full overflow-y-auto">
              <option hidden>
                Kategori Laporan
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index}>Option {index + 1}</option>
              ))}
            </select>
          </label>
          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text font-bold">
                Detail Laporan (Optional)
              </span>
            </div>
            <textarea
              placeholder="Tuliskan detail laporan...."
              className="
                textarea textarea-bordered textarea-md 
                w-full min-h-40
                resize-none"
            ></textarea>
          </label>
        </form>
        <p className="text-xs mb-4">
          Lorem ipsum dolor sit amet consectetur. Nulla mattis risus a
          risus sodales egestas elementum
        </p>
        <button
          className="
            btn btn-sm w-full 
            bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500 focus:outline-none
          text-white"
        >
          Kirim
        </button>
      </div>
    </dialog>
  );
}
