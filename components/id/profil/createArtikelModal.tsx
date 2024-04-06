import React from "react";
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function CreateArtikelModal() {
  return (
    <dialog id="create_artikel_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-4">Buat Artikel</h3>
        <form>
          <label className="form-control w-full">
            <div className="flex flex-row gap-1 mb-1">
              <span className="label-text font-bold">Judul</span>
              <span className="label-text font-bold text-error">*</span>
            </div>
            <div className="indicator w-11/12">
              <span className="indicator-item badge">Required</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
              />
            </div>
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
              text-white font-bold text-xs lg:text-md xl:text-xl"
          >
            <NewspaperIcon/>
            Submit Artikel
          </button>
        </form>
      </div>
    </dialog>
  );
}
